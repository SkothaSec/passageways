import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'

const ALL_TOKEN = '__ALL__'

function MultiSelectFilter({
  label,
  options,
  value,
  onChange,
  disableAllOption = false,
  defaultToAll = true,
  sx,
}) {
  const isAllSelected = !disableAllOption && value.length === options.length && options.length > 0

  const handleChange = (event) => {
    const { value: selected } = event.target

    const latest = selected[selected.length - 1]

    if (!disableAllOption && latest === ALL_TOKEN) {
      onChange([])
      return
    }

    if (!disableAllOption && isAllSelected) {
      const removed = value.filter((option) => !selected.includes(option))
      if (removed.length === 1) {
        onChange([removed[0]])
        return
      }
    }

    if (!selected.length && defaultToAll && !disableAllOption && options.length) {
      onChange([...options])
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
          if (!selected.length || (!disableAllOption && selected.length === options.length)) {
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
          <MenuItem value={ALL_TOKEN}>
            <Typography variant="body2">All</Typography>
          </MenuItem>
        )}
        {options.map((option) => {
          return (
            <MenuItem key={option} value={option}>
              <Typography variant="body2">{option}</Typography>
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
  defaultToAll: PropTypes.bool,
  sx: PropTypes.object,
}

export default MultiSelectFilter
