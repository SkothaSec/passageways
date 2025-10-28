import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

const HAMMERTIME_URL = 'https://hammertime.cyou/'

function DungeonMasterForm({ form, values, onChange }) {
  return (
    <Stack spacing={2}>
      {form.fields.map((field) => {
        if (field.type === 'datetime') {
          return (
            <Stack
              key={field.name}
              spacing={1.5}
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretch', sm: 'flex-end' }}
            >
              <TextField
                label={field.label}
                name={field.name}
                value={values[field.name] ?? ''}
                onChange={onChange}
                fullWidth
                placeholder={field.placeholder || field.defaultValue}
                helperText={field.helperText}
              />
              <Button
                variant="outlined"
                component="a"
                href={HAMMERTIME_URL}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  whiteSpace: 'nowrap',
                  width: { xs: '100%', sm: 'auto' },
                }}
              >
                Open Hammertime
              </Button>
            </Stack>
          )
        }

        return (
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
            helperText={field.helperText || ''}
          />
        )
      })}
    </Stack>
  )
}

export default DungeonMasterForm
