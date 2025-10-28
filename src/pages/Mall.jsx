import { useEffect, useMemo, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import MallFilters from '../components/mall/MallFilters.jsx'
import MallTable from '../components/mall/MallTable.jsx'
import useMallInventory from '../components/mall/useMallInventory.js'
import { MALL_SHEETS, buildMallSheetViewUrl } from '../data/mallTable.js'

function Mall() {
  const [activeSheetId, setActiveSheetId] = useState(MALL_SHEETS[0]?.id ?? '')
  const activeSheet = useMemo(() => {
    if (!MALL_SHEETS.length) {
      return { id: 'default', label: 'Inventory', sheet: 'Sheet1' }
    }
    return MALL_SHEETS.find((sheet) => sheet.id === activeSheetId) ?? MALL_SHEETS[0]
  }, [activeSheetId])

  const { rows, loading, error } = useMallInventory(activeSheet.sheet)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTiers, setSelectedTiers] = useState([])
  const [selectedRarity, setSelectedRarity] = useState([])
  const [attunementFilter, setAttunementFilter] = useState('all')

  const tierOptions = useMemo(
    () => Array.from(new Set(rows.map((row) => row.tier || 'Unspecified'))),
    [rows],
  )

  const rarityOptions = useMemo(
    () => Array.from(new Set(rows.map((row) => row.rarity || 'Unspecified'))),
    [rows],
  )

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

  useEffect(() => {
    setSearchQuery('')
    setSelectedTiers([])
    setSelectedRarity([])
    setAttunementFilter('all')
  }, [activeSheetId])

  return (
    <Container maxWidth="lg" sx={{ py: 6, display: 'grid', gap: 3 }}>
      <Box sx={{ display: 'grid', gap: 1.5 }}>
        <Typography variant="h4" component="h1">
          Passageways Mall Inventory
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Browse the curated inventory pulled directly from the Passageways mall sheet. Use the filters to hone in on the exact gear you need.
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Data source: <Link href={buildMallSheetViewUrl(activeSheet)} target="_blank" rel="noopener noreferrer">Passageways Mall Google Sheet</Link>
        </Typography>
      </Box>

      <MallFilters
        sheetOptions={MALL_SHEETS}
        selectedSheetId={activeSheetId}
        onSheetChange={setActiveSheetId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        tierOptions={tierOptions}
        selectedTiers={selectedTiers}
        onTiersChange={setSelectedTiers}
        rarityOptions={rarityOptions}
        selectedRarity={selectedRarity}
        onRarityChange={setSelectedRarity}
        attunementFilter={attunementFilter}
        onAttunementChange={setAttunementFilter}
      />

      {loading ? (
        <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 320 }}>
          <CircularProgress color="inherit" />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Mall inventory is loading...
          </Typography>
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <MallTable rows={filteredRows} columns={columns} loading={loading} />
      )}
    </Container>
  )
}

export default Mall
