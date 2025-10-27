import { useEffect, useMemo, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { MALL_SHEET_GVIZ_URL, parseMallResponse } from '../data/mallTable.js'
import MultiSelectFilter from '../components/MultiSelectFilter.jsx'

function Mall() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTiers, setSelectedTiers] = useState([])
  const [selectedRarity, setSelectedRarity] = useState([])
  const [attunementFilter, setAttunementFilter] = useState('all')

  useEffect(() => {
    let abort = false

    const load = async () => {
      try {
        const response = await fetch(MALL_SHEET_GVIZ_URL)
        if (!response.ok) {
          throw new Error(`Failed to load mall data: ${response.status}`)
        }

        const payload = await response.text()
        if (abort) {
          return
        }

        const normalizedRows = parseMallResponse(payload).map((row, index) => ({
          id: `${row.tier}-${row.name}-${index}`,
          ...row,
        }))

        if (!abort) {
          setRows(normalizedRows)
          setError('')
        }
      } catch (err) {
        if (!abort) {
          console.error(err)
          setError('Unable to load mall inventory right now. Please retry later.')
        }
      } finally {
        if (!abort) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      abort = true
    }
  }, [])

  const tierOptions = useMemo(() => Array.from(new Set(rows.map((row) => row.tier || 'Unspecified'))), [rows])

  const rarityOptions = useMemo(() => Array.from(new Set(rows.map((row) => row.rarity || 'Unspecified'))), [rows])

  const columns = useMemo(
    () => [
      { field: 'tier', headerName: 'Tier', width: 100 },
      {
        field: 'name',
        headerName: 'Name',
        flex: 1.4,
        minWidth: 220,
        renderCell: (params) => {
          const value = params.value || '—'
          const url = params.row.url

          if (!url) {
            return value
          }

          return (
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="primary"
              sx={{ fontWeight: 500 }}
            >
              {value}
            </Link>
          )
        },
      },
      { field: 'source', headerName: 'Source', minWidth: 150, flex: 1 },
      { field: 'rarity', headerName: 'Rarity', minWidth: 140, flex: 0.8 },
      { field: 'type', headerName: 'Type', minWidth: 180, flex: 1 },
      { field: 'attunement', headerName: 'Attunement', minWidth: 150, flex: 0.6 },
      {
        field: 'value',
        headerName: 'Value (gp)',
        minWidth: 140,
        flex: 0.7,
        renderCell: ({ row }) => row.value || '—',
      },
      {
        field: 'note',
        headerName: 'Notes',
        minWidth: 220,
        flex: 1.2,
        renderCell: ({ row }) => row.note || '—',
      },
    ],
    [],
  )

  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    const tierSet = selectedTiers.length ? new Set(selectedTiers) : null
    const raritySet = selectedRarity.length ? new Set(selectedRarity) : null

    return rows.filter((row) => {
      const tier = row.tier || 'Unspecified'
      const rarity = row.rarity || 'Unspecified'

      if (tierSet && !tierSet.has(tier)) {
        return false
      }

      if (raritySet && !raritySet.has(rarity)) {
        return false
      }

      if (attunementFilter !== 'all') {
        const requiresAttunement = row.attunement?.toLowerCase().includes('required')
        if (attunementFilter === 'required' && !requiresAttunement) {
          return false
        }
        if (attunementFilter === 'not_required' && requiresAttunement) {
          return false
        }
      }

      if (!query) {
        return true
      }

      const haystack = [row.name, rarity, row.type, row.note].join(' ').toLowerCase()
      return haystack.includes(query)
    })
  }, [rows, searchQuery, selectedTiers, selectedRarity, attunementFilter])

  useEffect(() => {
    if (!loading && tierOptions.length && !selectedTiers.length) {
      setSelectedTiers(tierOptions)
    }
  }, [loading, tierOptions, selectedTiers.length])

  useEffect(() => {
    if (!loading && rarityOptions.length && !selectedRarity.length) {
      setSelectedRarity(rarityOptions)
    }
  }, [loading, rarityOptions, selectedRarity.length])

  const renderFilters = () => (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
        alignItems: 'center',
      }}
    >
      <TextField
        label="Search by item name"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Start typing to filter"
        fullWidth
      />
      <MultiSelectFilter
        label="Tier"
        options={tierOptions}
        value={selectedTiers}
        onChange={setSelectedTiers}
      />
      <MultiSelectFilter
        label="Rarity"
        options={rarityOptions}
        value={selectedRarity}
        onChange={setSelectedRarity}
      />
      <FormControl component="fieldset" sx={{ gridColumn: { xs: '1 / -1', md: 'span 2', lg: 'auto' } }}>
        <FormLabel component="legend">Attunement</FormLabel>
        <RadioGroup
          row
          value={attunementFilter}
          onChange={(event) => setAttunementFilter(event.target.value)}
        >
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel value="required" control={<Radio />} label="Required" />
          <FormControlLabel value="not_required" control={<Radio />} label="Not required" />
        </RadioGroup>
      </FormControl>
    </Box>
  )

  const renderGrid = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <CircularProgress size={24} />
          <Typography variant="body2" color="text.secondary">
            Loading mall inventory…
          </Typography>
        </Box>
      )
    }

    if (error) {
      return <Alert severity="error">{error}</Alert>
    }

    return (
      <Paper elevation={2} sx={{ height: 680, width: '100%', display: 'grid', gap: 2, p: 2 }}>
        {renderFilters()}
        <DataGrid
          rows={filteredRows}
          columns={columns}
          disableRowSelectionOnClick
          checkboxSelection
          initialState={{
            pagination: { paginationModel: { pageSize: 25, page: 0 } },
            sorting: { sortModel: [{ field: 'tier', sort: 'asc' }] },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          slots={{ toolbar: GridToolbar }}
          slotProps={{ toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 300 } } }}
        />
      </Paper>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6, display: 'grid', gap: 3 }}>
      <Box sx={{ display: 'grid', gap: 1 }}>
        <Typography variant="h4" component="h2">
          Adventurer's Mall
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Stock up on essentials and legendary finds for your next campaign. Inventory is synced
          directly from the master spreadsheet.
        </Typography>
      </Box>

      {renderGrid()}
    </Container>
  )
}

export default Mall
