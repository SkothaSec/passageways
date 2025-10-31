import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded'
import GroupRoundedIcon from '@mui/icons-material/GroupRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'

const HAMMERTIME_URL = 'https://hammertime.cyou/'

const slugify = (value = '') => value.toLowerCase().replace(/[^a-z0-9]+/g, '-')

const sectionIconLookup = {
  sword: AutoAwesomeRoundedIcon,
  calendar: EventNoteRoundedIcon,
  users: GroupRoundedIcon,
}

function normalizeRows(section) {
  if (Array.isArray(section.layout) && section.layout.length) {
    return section.layout.map((row) =>
      row.map((item) =>
        typeof item === 'string'
          ? {
              field: item,
            }
          : item,
      ),
    )
  }

  return section.fields.map((fieldName) => [{ field: fieldName }])
}

const inputLabelProps = {
  sx: {
    color: 'rgba(228, 226, 255, 0.78)',
    fontWeight: 600,
    letterSpacing: '0.06em',
    fontSize: 12,
    textTransform: 'uppercase',
  },
}

const helperTextProps = {
  sx: {
    color: 'rgba(186, 200, 255, 0.7)',
    mt: 1,
    fontSize: 12,
  },
}

const baseInputSx = {
  alignSelf: 'stretch',
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    background: 'linear-gradient(135deg, rgba(19, 22, 46, 0.78), rgba(33, 23, 53, 0.74))',
    border: '1px solid rgba(127, 90, 240, 0.32)',
    transition: 'border-color 200ms ease, box-shadow 200ms ease, background 200ms ease',
    minHeight: { xs: 56, md: 60 },
    '&:hover': {
      borderColor: 'rgba(186, 154, 255, 0.7)',
      background: 'linear-gradient(135deg, rgba(25, 28, 60, 0.86), rgba(43, 30, 70, 0.8))',
    },
    '&.Mui-focused': {
      borderColor: 'rgba(193, 164, 255, 0.85)',
      boxShadow: '0 0 0 4px rgba(127, 90, 240, 0.22)',
    },
    '& .MuiOutlinedInput-input': {
      color: '#f0f2ff',
      fontSize: 15,
      fontWeight: 500,
      letterSpacing: '0.01em',
      px: 2.25,
      py: 1.5,
    },
    '& .MuiOutlinedInput-inputMultiline': {
      lineHeight: 1.6,
      py: 0,
    },
    '& textarea': {
      px: 2.25,
      py: 1.75,
    },
    '& fieldset': {
      border: 'transparent',
      borderRadius: '16px',
    },
  },
}

const datetimeButtonSx = {
  borderRadius: '18px',
  textTransform: 'uppercase',
  fontWeight: 700,
  letterSpacing: '0.06em',
  height: { xs: 56, md: 60 },
  px: { xs: 3, md: 3.5 },
  py: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
  width: { xs: '100%', md: 'auto' },
  boxShadow: '0 20px 38px rgba(34, 164, 210, 0.35)',
  background: 'linear-gradient(135deg, rgba(76, 224, 245, 0.95), rgba(112, 250, 226, 0.9))',
  color: '#04222d',
  '&:hover': {
    background: 'linear-gradient(135deg, rgba(96, 234, 255, 0.98), rgba(132, 255, 236, 0.94))',
    boxShadow: '0 22px 46px rgba(34, 164, 210, 0.45)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 18,
  },
}

function DungeonMasterForm({ form, values, onChange }) {
  const fieldLookup = form.fields.reduce((acc, field) => {
    acc[field.name] = field
    return acc
  }, {})

  const sections = form.sections
    ? form.sections
    : [
        {
          id: slugify(form.label),
          title: form.label,
          description: form.description,
          fields: form.fields.map((field) => field.name),
        },
      ]

  const renderField = (field) => {
    if (field.type === 'datetime') {
      return (
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 1.5, md: 2 }}
          alignItems={{ xs: 'stretch', md: 'center' }}
          sx={{ width: '100%' }}
        >
          <TextField
            label={field.label}
            name={field.name}
            value={values[field.name] ?? ''}
            onChange={onChange}
            fullWidth
            placeholder={field.placeholder || field.defaultValue}
            helperText={field.helperText}
            InputLabelProps={inputLabelProps}
            FormHelperTextProps={helperTextProps}
            size="medium"
            sx={{
              ...baseInputSx,
              flexGrow: 1,
              minWidth: 0,
              width: '100%',
            }}
          />
          <Box sx={{ display: 'flex', width: { xs: '100%', md: 'auto' }, alignItems: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              component="a"
              href={HAMMERTIME_URL}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<OpenInNewRoundedIcon />}
              sx={{ ...datetimeButtonSx, alignSelf: { xs: 'stretch', md: 'center' } }}
            >
              Generate Time
            </Button>
          </Box>
        </Stack>
      )
    }

    return (
      <TextField
        label={field.label}
        name={field.name}
        value={values[field.name] ?? ''}
        onChange={onChange}
        multiline={field.multiline}
        minRows={field.minRows}
        fullWidth
        placeholder={field.placeholder || field.defaultValue}
        helperText={field.helperText || ''}
        InputLabelProps={inputLabelProps}
        FormHelperTextProps={helperTextProps}
        size="medium"
        sx={{ ...baseInputSx, width: '100%' }}
      />
    )
  }

  return (
    <Stack spacing={4} sx={{ width: '100%', maxWidth: { xs: '100%', lg: 960 }, mx: 'auto' }}>
      {sections.map((section, sectionIndex) => {
        const rows = normalizeRows(section)
        const SectionIcon = section.icon ? sectionIconLookup[section.icon] : null

        return (
          <Box
            key={section.id}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '24px',
              border: '1px solid rgba(127, 90, 240, 0.28)',
              background: 'linear-gradient(140deg, rgba(42, 23, 82, 0.9), rgba(68, 35, 115, 0.75))',
              p: { xs: 3.25, md: 4.5 },
              display: 'grid',
              gap: { xs: 3, md: 3.5 },
              boxShadow: '0 24px 48px rgba(8, 6, 25, 0.35)',
              '&::before': {
                content: "''",
                position: 'absolute',
                width: 360,
                height: 360,
                top: -220,
                right: -160,
                background: 'radial-gradient(circle at center, rgba(137, 104, 255, 0.32), transparent 70%)',
              },
              '&::after': {
                content: "''",
                position: 'absolute',
                width: 280,
                height: 280,
                bottom: -200,
                left: -140,
                background: 'radial-gradient(circle at center, rgba(52, 208, 216, 0.18), transparent 70%)',
              },
              '& > *': {
                position: 'relative',
                zIndex: 1,
              },
            }}
          >
            {(section.title || section.description) && (
              <Box sx={{ display: 'grid', gap: 1.25 }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box
                    aria-hidden
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      background: 'linear-gradient(135deg, rgba(138, 84, 255, 0.65), rgba(76, 220, 255, 0.45))',
                      boxShadow: '0 8px 18px rgba(22, 18, 46, 0.65)',
                    }}
                  >
                    {SectionIcon ? (
                      <SectionIcon sx={{ fontSize: 20, color: '#0b041f' }} />
                    ) : (
                      <Typography component="span" sx={{ fontWeight: 700, color: '#0b041f' }}>
                        {sectionIndex + 1}
                      </Typography>
                    )}
                  </Box>
                  {section.title ? (
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        color: '#f8f6ff',
                        fontSize: { xs: 16, sm: 17 },
                      }}
                    >
                      {section.title}
                    </Typography>
                  ) : null}
                </Stack>
                {section.description ? (
                  <Typography
                    variant="body2"
                    color="rgba(208, 214, 255, 0.85)"
                    sx={{ maxWidth: { md: '80%' }, fontSize: 14.5, letterSpacing: '0.01em' }}
                  >
                    {section.description}
                  </Typography>
                ) : null}
                <Divider sx={{ borderColor: 'rgba(127, 90, 240, 0.22)', mt: 0.75 }} />
              </Box>
            )}

            <Stack spacing={{ xs: 2.75, md: 3.25 }} sx={{ width: '100%' }}>
              {rows.map((row, rowIndex) => {
                if (row.length === 1) {
                  const singleField = fieldLookup[row[0].field]
                  if (!singleField) {
                    return null
                  }

                  return (
                    <Box key={`${section.id}-row-${rowIndex}`} sx={{ width: '100%' }}>
                      {renderField(singleField)}
                    </Box>
                  )
                }

                return (
                  <Grid
                    container
                    key={`${section.id}-row-${rowIndex}`}
                    spacing={{ xs: 2.5, md: 3 }}
                    alignItems="stretch"
                    justifyContent="flex-start"
                    sx={{ width: '100%', margin: 0 }}
                  >
                    {row.map((item) => {
                      const field = fieldLookup[item.field]
                      if (!field) {
                        return null
                      }

                      const mdSpan = Math.min(12, Math.max(1, item.span ?? (field.width === 'half' ? 6 : 12)))

                      return (
                        <Grid
                          item
                          key={field.name}
                          xs={12}
                          md={mdSpan}
                          sx={{ display: 'flex', width: '100%' }}
                        >
                          <Box
                            sx={{
                              flexGrow: 1,
                              width: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 0.75,
                            }}
                          >
                            {renderField(field)}
                          </Box>
                        </Grid>
                      )
                    })}
                  </Grid>
                )
              })}
            </Stack>
          </Box>
        )
      })}
    </Stack>
  )
}

export default DungeonMasterForm
