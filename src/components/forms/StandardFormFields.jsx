import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

function StandardFormFields({ fields, values, onChange }) {
  return (
    <Stack spacing={2}>
      {fields.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          name={field.name}
          value={values[field.name] ?? ''}
          onChange={onChange}
          multiline={field.multiline}
          minRows={field.minRows}
          fullWidth
          placeholder={field.placeholder || field.defaultValue}
          helperText={field.helperText}
        />
      ))}
    </Stack>
  )
}

export default StandardFormFields
