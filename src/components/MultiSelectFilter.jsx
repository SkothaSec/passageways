import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

function MultiSelectFilter({ label, options, value, onChange, disableAllOption = false, sx }) {
  const normalizedOptions = disableAllOption ? options : ['__ALL__', ...options]
  const isAllSelected = !disableAllOption && value.length === options.length

  const handleChange = (event) => {
    const { value: selected } = event.target

    if (selected[selected.length - 1] === '__ALL__') {
      onChange(isAllSelected ? [] : [...options])
      return
    }

    onChange(selected)
  }

  return (
    <FormControl fullWidth sx={sx}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        label={label}
        value={value}
        onChange={handleChange}
        renderValue={(selected) => {
          if (!selected.length) {
            return 'None selected'
          }
          if (!disableAllOption && selected.length === options.length) {
            return 'All'
          }
          return (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {selected.map((option) => (
                <Chip key={option} label={option} size="small" />
              ))}
            </Box>
          )
        }}
        MenuProps={{ PaperProps: { sx: { maxHeight: 320 } } }}
      >
        {!disableAllOption && (
          <MenuItem value="__ALL__">
            <Checkbox size="small" checked={isAllSelected} />
            <ListItemText primary="All" />
          </MenuItem>
        )}
        {options.map((option) => {
          const checked = value.indexOf(option) > -1
          return (
            <MenuItem key={option} value={option}>
              <Checkbox size="small" checked={checked} />
              <ListItemText primary={option} />
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

MultiSelectFilter.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  disableAllOption: PropTypes.bool,
  sx: PropTypes.object,
}

export default MultiSelectFilter
