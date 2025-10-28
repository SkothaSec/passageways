import { useMemo } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

export const CORE_STAT_FIELDS = ['strScore', 'dexScore', 'conScore', 'intScore', 'wisScore', 'chaScore']

function CreateCharacterForm({ form, values, onChange, onUpdateValues, pointBuy }) {
  const fieldsByName = useMemo(() => {
    const map = new Map()
    form.fields.forEach((field) => {
      map.set(field.name, field)
    })
    return map
  }, [form.fields])

  const renderField = (name, extraProps = {}) => {
    const field = fieldsByName.get(name)

    if (!field) {
      return null
    }

    const isStatField = CORE_STAT_FIELDS.includes(field.name)
    const errorMessage = isStatField ? pointBuy.errors[field.name] : undefined

    if (field.name === 'ruleSetVersion') {
      const handleVersionChange = (_, next) => {
        if (!next) {
          return
        }
        onUpdateValues((prev) => ({ ...prev, ruleSetVersion: next }))
      }

      return (
        <ToggleButtonGroup
          key={field.name}
          value={values.ruleSetVersion || ''}
          exclusive
          onChange={handleVersionChange}
          color="primary"
          sx={{
            background: 'linear-gradient(135deg, rgba(24, 22, 42, 0.7), rgba(34, 26, 54, 0.85))',
            borderRadius: 20,
            p: 0.5,
            gap: 1,
            display: 'flex',
          }}
        >
          {['2014', '2024'].map((option) => (
            <ToggleButton
              key={option}
              value={option}
              sx={{
                flex: 1,
                textTransform: 'uppercase',
                fontWeight: 700,
                letterSpacing: '0.08em',
                borderRadius: 16,
                border: '1px solid rgba(127, 90, 240, 0.35)',
                color: 'rgba(222, 213, 255, 0.88)',
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, rgba(103, 67, 206, 0.95), rgba(154, 112, 255, 0.95))',
                  color: 'white',
                  borderColor: 'rgba(177, 150, 255, 0.8)',
                  boxShadow: '0 0 0 2px rgba(137, 110, 255, 0.35)',
                },
              }}
            >
              {option}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )
    }

    if (field.name === 'alignment') {
      const alignments = [
        'Lawful Good',
        'Neutral Good',
        'Chaotic Good',
        'Lawful Neutral',
        'True Neutral',
        'Chaotic Neutral',
        'Lawful Evil',
        'Neutral Evil',
        'Chaotic Evil',
      ]

      return (
        <Box key={`${field.name}-wrapper`} sx={{ width: '100%' }}>
          <TextField
            select
            label={field.label}
            name={field.name}
            value={values[field.name] ?? ''}
            onChange={onChange}
            fullWidth
            helperText={field.helperText}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                background: 'linear-gradient(135deg, rgba(24, 22, 42, 0.85), rgba(34, 26, 54, 0.9))',
                border: '1px solid rgba(127, 90, 240, 0.45)',
                '&:hover': {
                  borderColor: 'rgba(177, 150, 255, 0.9)',
                  boxShadow: '0 0 0 2px rgba(127, 90, 240, 0.25)',
                },
                '&.Mui-focused': {
                  borderColor: 'rgba(196, 174, 255, 0.9)',
                  boxShadow: '0 0 0 3px rgba(137, 110, 255, 0.35)',
                },
              },
            }}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    backgroundColor: '#1a162e',
                    border: '1px solid rgba(127, 90, 240, 0.3)',
                  },
                },
              },
            }}
            {...extraProps}
          >
            {alignments.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      )
    }

    const baseTextField = (
      <TextField
        key={field.name}
        label={isStatField ? field.label.split('(')[0].trim() : field.label}
        name={field.name}
        value={values[field.name] ?? ''}
        onChange={onChange}
        multiline={field.multiline}
        minRows={field.minRows}
        fullWidth
        placeholder={field.placeholder || field.defaultValue}
        helperText={errorMessage || field.helperText}
        error={Boolean(errorMessage)}
        type={isStatField ? 'number' : field.type}
        inputProps={
          isStatField
            ? {
                min: 8,
                max: 18,
                step: 1,
                inputMode: 'numeric',
                style: {
                  textAlign: 'center',
                  fontWeight: 600,
                  fontSize: '1.2rem',
                  letterSpacing: '0.06em',
                },
                ...field.inputProps,
              }
            : field.inputProps
        }
        InputLabelProps={
          isStatField
            ? {
                shrink: true,
                sx: {
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: 'rgba(173, 161, 255, 0.9) !important',
                },
              }
            : field.InputLabelProps
        }
        size={isStatField ? 'small' : field.size}
        sx={
          isStatField
            ? {
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, rgba(24, 22, 42, 0.85), rgba(34, 26, 54, 0.9))',
                  border: '1px solid rgba(127, 90, 240, 0.45)',
                  transition: 'border-color 200ms ease, box-shadow 200ms ease',
                  '&:hover': {
                    borderColor: 'rgba(177, 150, 255, 0.9)',
                    boxShadow: '0 0 0 2px rgba(127, 90, 240, 0.25)',
                  },
                  '&.Mui-focused': {
                    borderColor: 'rgba(196, 174, 255, 0.9)',
                    boxShadow: '0 0 0 3px rgba(137, 110, 255, 0.35)',
                  },
                },
                '& .MuiInputBase-input': {
                  py: 1.5,
                },
                ...extraProps.sx,
              }
            : extraProps.sx
        }
        {...extraProps}
      />
    )

    if (!isStatField) {
      return baseTextField
    }

    return (
      <Box key={`${field.name}-wrapper`} sx={{ display: 'grid', gap: 0.75 }}>
        {baseTextField}
      </Box>
    )
  }

  const sectionSx = {
    p: 2.5,
    borderRadius: 2,
    border: '1px solid rgba(127, 90, 240, 0.25)',
    background: 'linear-gradient(135deg, rgba(18, 20, 38, 0.7), rgba(28, 20, 48, 0.85))',
    backdropFilter: 'blur(12px)',
    display: 'grid',
    gap: 2,
  }

  const pointBuyMessage = (() => {
    if (pointBuy.hasInvalidScores) {
      return 'Fix the highlighted scores to calculate your 35 point buy total.'
    }

    if (pointBuy.missingScores) {
      return 'Enter all six ability scores to validate the 35 point buy total.'
    }

    if (pointBuy.total === 35) {
      return 'Point Buy Total: 35 / 35 — ready for adventures!'
    }

    return `Point Buy Total: ${pointBuy.total} / 35`
  })()

  const pointBuyColor = (() => {
    if (pointBuy.hasInvalidScores || (!pointBuy.missingScores && pointBuy.total !== 35)) {
      return 'error.main'
    }

    if (pointBuy.missingScores) {
      return 'warning.main'
    }

    return 'success.main'
  })()

  return (
    <Stack spacing={3}>
      <Box sx={sectionSx}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Identity
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {renderField('characterName')}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderField('ruleSetVersion')}
          </Grid>
        </Grid>
      </Box>

      <Box sx={sectionSx}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Class & Lineage
        </Typography>
        <Stack spacing={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {renderField('classes')}
            </Grid>
            <Grid item xs={12} md={6}>
              {renderField('subclass')}
            </Grid>
          </Grid>

          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '2fr 3fr' } }}>
            {renderField('raceAndAsi', { sx: { width: '100%' } })}
            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
              {renderField('size', { fullWidth: true })}
              {renderField('alignment', { fullWidth: true })}
            </Box>
          </Box>
        </Stack>
      </Box>

      <Box sx={sectionSx}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Background Details
        </Typography>
        {renderField('background')}
      </Box>

      <Box sx={sectionSx}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Core Stats
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(200, 189, 255, 0.7)' }}>
          Enter base ability scores before racial or background increases.
        </Typography>
        <Grid container spacing={2}>
          {CORE_STAT_FIELDS.map((fieldName) => (
            <Grid item xs={6} sm={4} md={2} key={fieldName}>
              {renderField(fieldName)}
            </Grid>
          ))}
        </Grid>
        <Typography variant="body2" sx={{ color: pointBuyColor }}>
          {pointBuyMessage}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Use the 35 point buy calculator if you need help balancing totals.
        </Typography>
      </Box>

      <Box sx={sectionSx}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Languages
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            {renderField('languagesRace')}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderField('languagesClass')}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderField('languagesBackground')}
          </Grid>
        </Grid>
      </Box>

      <Box sx={sectionSx}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Proficient Skills
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            {renderField('skillsRace')}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderField('skillsClass')}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderField('skillsBackground')}
          </Grid>
        </Grid>
      </Box>

      <Box sx={sectionSx}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Proficient Tools
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            {renderField('toolsRace')}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderField('toolsClass')}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderField('toolsBackground')}
          </Grid>
        </Grid>
      </Box>

      <Box sx={sectionSx}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Expertise & Feats
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {renderField('expertise')}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderField('feats')}
          </Grid>
        </Grid>
      </Box>

      <Box sx={sectionSx}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Other Class Choices
        </Typography>
        {renderField('otherChoices')}
      </Box>
    </Stack>
  )
}

export default CreateCharacterForm
