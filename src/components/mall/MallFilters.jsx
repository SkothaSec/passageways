import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import MultiSelectFilter from '../MultiSelectFilter.jsx'

function MallFilters({
  searchQuery,
  onSearchChange,
  tierOptions,
  selectedTiers,
  onTiersChange,
  rarityOptions,
  selectedRarity,
  onRarityChange,
  attunementFilter,
  onAttunementChange,
  sheetOptions,
  selectedSheetId,
  onSheetChange,
}) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
        alignItems: 'center',
      }}
    >
      {sheetOptions?.length ? (
        <TextField
          select
          label="Inventory Category"
          value={selectedSheetId}
          onChange={(event) => onSheetChange?.(event.target.value)}
          fullWidth
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
        fullWidth
      />
      <MultiSelectFilter
        label="Tier"
        options={tierOptions}
        value={selectedTiers}
        onChange={onTiersChange}
        defaultToAll
      />
      <MultiSelectFilter
        label="Rarity"
        options={rarityOptions}
        value={selectedRarity}
        onChange={onRarityChange}
        defaultToAll
      />
      <FormControl component="fieldset">
        <FormLabel component="legend">Attunement</FormLabel>
        <RadioGroup
          row
          value={attunementFilter}
          onChange={(event) => onAttunementChange(event.target.value)}
          sx={{ flexWrap: 'wrap' }}
        >
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel value="required" control={<Radio />} label="Required" />
          <FormControlLabel value="not_required" control={<Radio />} label="Not Required" />
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

export default MallFilters
