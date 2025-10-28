import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MultiSelectFilter from '../MultiSelectFilter.jsx'

function MallFiltersPanel({
  searchQuery,
  onSearchChange,
  sheetOptions,
  selectedSheetId,
  onSheetChange,
  tierOptions,
  selectedTiers,
  onTiersChange,
  rarityOptions,
  selectedRarity,
  onRarityChange,
  attunementFilter,
  onAttunementChange,
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [open, setOpen] = useState(!isMobile)

  useEffect(() => {
    setOpen(!isMobile)
  }, [isMobile])

  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: 2,
        border: '1px solid rgba(127, 90, 240, 0.25)',
        background: 'linear-gradient(135deg, rgba(18, 20, 38, 0.65), rgba(28, 20, 48, 0.8))',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Filters
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setOpen((prev) => !prev)}
            startIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{
              color: 'inherit',
              borderColor: 'rgba(127, 90, 240, 0.4)',
              '&:hover': {
                borderColor: 'rgba(127, 90, 240, 0.7)',
              },
            }}
          >
            {open ? 'Hide' : 'Show'}
          </Button>
        </Box>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ px: { xs: 2, sm: 3 }, pb: 2 }}>
          <Stack spacing={2}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              alignItems={{ xs: 'stretch', md: 'center' }}
            >
              {sheetOptions?.length ? (
                <TextField
                  select
                  label="Inventory Category"
                  value={selectedSheetId}
                  onChange={(event) => onSheetChange?.(event.target.value)}
                  sx={{ minWidth: { xs: '100%', md: 200 }, flex: 1 }}
                >
                  {sheetOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}
              <TextField
                label="Search by item name"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Start typing to filter"
                sx={{ flex: 1, minWidth: { xs: '100%', md: 220 } }}
              />
            </Stack>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              alignItems={{ xs: 'stretch', md: 'flex-start' }}
            >
              <MultiSelectFilter
                label="Tier"
                options={tierOptions}
                value={selectedTiers}
                onChange={onTiersChange}
                defaultToAll
                sx={{ flex: 1, minWidth: { xs: '100%', md: 180 } }}
              />
              <MultiSelectFilter
                label="Rarity"
                options={rarityOptions}
                value={selectedRarity}
                onChange={onRarityChange}
                defaultToAll
                sx={{ flex: 1, minWidth: { xs: '100%', md: 180 } }}
              />
              <FormControl component="fieldset" sx={{ minWidth: { xs: '100%', md: 220 } }}>
                <FormLabel component="legend" sx={{ typography: 'caption', mb: 0.5 }}>
                  Attunement
                </FormLabel>
                <RadioGroup
                  row
                  value={attunementFilter}
                  onChange={(event) => onAttunementChange(event.target.value)}
                  sx={{ flexWrap: 'wrap', gap: 1 }}
                >
                  <FormControlLabel value="all" control={<Radio size="small" />} label="All" />
                  <FormControlLabel value="required" control={<Radio size="small" />} label="Required" />
                  <FormControlLabel
                    value="not_required"
                    control={<Radio size="small" />}
                    label="Not Required"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
          </Stack>
        </Box>
      </Collapse>
    </Paper>
  )
}

MallFiltersPanel.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  sheetOptions: PropTypes.array,
  selectedSheetId: PropTypes.string.isRequired,
  onSheetChange: PropTypes.func.isRequired,
  tierOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedTiers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTiersChange: PropTypes.func.isRequired,
  rarityOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedRarity: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRarityChange: PropTypes.func.isRequired,
  attunementFilter: PropTypes.string.isRequired,
  onAttunementChange: PropTypes.func.isRequired,
}

MallFiltersPanel.defaultProps = {
  sheetOptions: [],
}

export default MallFiltersPanel
