import { useMemo } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded'
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded'
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded'
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded'
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded'
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded'
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded'

export const CORE_STAT_FIELDS = ['strScore', 'dexScore', 'conScore', 'intScore', 'wisScore', 'chaScore']

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

const baseInputRoot = {
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
    padding: '18px 18px',
  },
  '& .MuiOutlinedInput-inputMultiline': {
    lineHeight: 1.6,
    padding: '18px 18px',
  },
  '& textarea': {
    padding: '18px 18px',
  },
  '& fieldset': {
    border: 'transparent',
    borderRadius: '16px',
  },
}

const baseInputSx = {
  alignSelf: 'stretch',
  width: '100%',
  '& .MuiOutlinedInput-root': baseInputRoot,
}

const statInputSx = {
  ...baseInputSx,
  '& .MuiOutlinedInput-root': {
    ...baseInputRoot,
    borderRadius: '12px',
    minHeight: { xs: 48, md: 52 },
    '& .MuiOutlinedInput-input': {
      textAlign: 'center',
      fontWeight: 700,
      fontSize: '1.08rem',
      letterSpacing: '0.05em',
      padding: '12px 0',
    },
  },
}

const cardSx = {
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
}

const sectionIconLookup = {
  identity: BadgeRoundedIcon,
  stats: EqualizerRoundedIcon,
  languages: TranslateRoundedIcon,
  skills: PsychologyRoundedIcon,
  tools: ConstructionRoundedIcon,
  expertise: MilitaryTechRoundedIcon,
  other: ExtensionRoundedIcon,
}

const visuallyHiddenLabelSx = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  border: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
}

const statTileBaseSx = {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '18px',
  border: '1px solid rgba(127, 90, 240, 0.32)',
  background: 'linear-gradient(150deg, rgba(28, 18, 53, 0.82), rgba(50, 25, 86, 0.92))',
  display: 'grid',
  gap: 1.25,
  px: { xs: 1.5, md: 2 },
  py: { xs: 1.5, md: 2 },
  minHeight: '100%',
  boxShadow: '0 18px 32px rgba(8, 6, 25, 0.35)',
  transition: 'border-color 220ms ease, transform 200ms ease',
  '&::before': {
    content: "''",
    position: 'absolute',
    width: 160,
    height: 160,
    top: -90,
    right: -40,
    background: 'radial-gradient(circle at center, rgba(137, 104, 255, 0.32), transparent 70%)',
    opacity: 0.75,
  },
  '&::after': {
    content: "''",
    position: 'absolute',
    width: 180,
    height: 180,
    bottom: -80,
    left: -60,
    background: 'radial-gradient(circle at center, rgba(76, 220, 255, 0.28), transparent 70%)',
    opacity: 0.65,
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: 'rgba(186, 154, 255, 0.55)',
  },
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
}

const statTileErrorSx = {
  borderColor: 'rgba(255, 128, 170, 0.72)',
  boxShadow: '0 0 0 3px rgba(255, 128, 170, 0.25)',
}

const statNameLabelSx = {
  fontWeight: 700,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: '#f8f6ff',
  fontSize: 12.5,
}

const getModifierPillSx = (hasError) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 48,
  padding: '4px 12px',
  borderRadius: 9999,
  border: `1px solid ${hasError ? 'rgba(255, 136, 184, 0.65)' : 'rgba(137, 104, 255, 0.45)'}`,
  background: hasError
    ? 'linear-gradient(135deg, rgba(255, 114, 178, 0.28), rgba(255, 178, 218, 0.24))'
    : 'linear-gradient(135deg, rgba(137, 104, 255, 0.25), rgba(76, 220, 255, 0.2))',
  color: '#f8f6ff',
  fontWeight: 700,
  fontSize: '0.95rem',
  letterSpacing: '0.04em',
})

const getStatInputSx = (hasError) => ({
  ...statInputSx,
  '& .MuiOutlinedInput-root': {
    ...statInputSx['& .MuiOutlinedInput-root'],
    border: hasError
      ? '1px solid rgba(255, 136, 184, 0.7)'
      : '1px solid rgba(127, 90, 240, 0.35)',
    '&:hover': {
      borderColor: hasError ? 'rgba(255, 170, 210, 0.9)' : 'rgba(186, 154, 255, 0.68)',
      background: 'linear-gradient(135deg, rgba(25, 28, 60, 0.82), rgba(43, 30, 70, 0.78))',
    },
    '&.Mui-focused': {
      borderColor: hasError ? 'rgba(255, 170, 210, 0.95)' : 'rgba(193, 164, 255, 0.85)',
      boxShadow: hasError
        ? '0 0 0 3px rgba(255, 128, 184, 0.22)'
        : '0 0 0 3px rgba(127, 90, 240, 0.22)',
    },
  },
})

const computeAbilityModifier = (rawScore) => {
  const score = Number.parseInt(rawScore, 10)
  if (Number.isNaN(score)) {
    return null
  }
  return Math.floor((score - 10) / 2)
}

const formatModifier = (modifier) => {
  if (modifier === null) {
    return '—'
  }
  return modifier >= 0 ? `+${modifier}` : `${modifier}`
}

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
    const { sx: extraSx, ...restExtraProps } = extraProps

    if (field.name === 'ruleSetVersion') {
      const handleVersionChange = (_, next) => {
        if (!next) {
          return
        }
        onUpdateValues((prev) => ({ ...prev, ruleSetVersion: next }))
      }

      return (
        <Box key="ruleSetVersion" sx={{ display: 'grid', gap: 1, width: '100%', alignContent: 'flex-start' }}>
          <Typography sx={{ ...inputLabelProps.sx }}>Version</Typography>
          <ToggleButtonGroup
            value={values.ruleSetVersion || ''}
            exclusive
            onChange={handleVersionChange}
            color="primary"
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'stretch',
              gap: 0.75,
              p: 0.5,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(19, 22, 46, 0.78), rgba(33, 23, 53, 0.74))',
              border: '1px solid rgba(127, 90, 240, 0.32)',
              minHeight: { xs: 56, md: 60 },
            }}
          >
            {['2014', '2024'].map((option) => (
              <ToggleButton
                key={option}
                value={option}
                sx={{
                  flex: 1,
                  borderRadius: 14,
                  border: '1px solid rgba(127, 90, 240, 0.35)',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: 'rgba(222, 213, 255, 0.88)',
                  '&.Mui-selected': {
                    background:
                      'linear-gradient(135deg, rgba(103, 67, 206, 0.95), rgba(154, 112, 255, 0.95))',
                    color: '#fff',
                    borderColor: 'rgba(177, 150, 255, 0.8)',
                    boxShadow: '0 0 0 2px rgba(137, 110, 255, 0.35)',
                  },
                }}
              >
                {option}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      )
    }

    if (field.name === 'alignment') {
      return (
        <TextField
          key={field.name}
          select
          label={field.label}
          name={field.name}
          value={values[field.name] ?? ''}
          onChange={onChange}
          fullWidth
          InputLabelProps={inputLabelProps}
          FormHelperTextProps={helperTextProps}
          sx={{ ...baseInputSx, ...extraSx }}
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
          {...restExtraProps}
        >
          {alignments.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      )
    }

    const commonProps = {
      label: isStatField ? field.label.split('(')[0].trim() : field.label,
      name: field.name,
      value: values[field.name] ?? '',
      onChange,
      multiline: field.multiline,
      minRows: field.minRows,
      fullWidth: true,
      placeholder: field.placeholder || field.defaultValue,
      helperText: errorMessage || field.helperText,
      error: Boolean(errorMessage),
      type: isStatField ? 'number' : field.type,
      InputLabelProps: inputLabelProps,
      FormHelperTextProps: helperTextProps,
      size: isStatField ? 'small' : 'medium',
      sx: { ...(isStatField ? statInputSx : baseInputSx), ...extraSx },
      ...restExtraProps,
    }

    if (isStatField) {
      commonProps.inputProps = {
        min: 8,
        max: 18,
        step: 1,
        inputMode: 'numeric',
        style: {
          textAlign: 'center',
          fontWeight: 700,
          fontSize: '1.25rem',
          letterSpacing: '0.08em',
        },
        ...field.inputProps,
      }
    } else if (field.inputProps) {
      commonProps.inputProps = field.inputProps
    }

    return <TextField key={field.name} {...commonProps} />
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

  const sections = [
    {
      id: 'identity',
      title: 'Character Creation',
      description: 'Fill in your character details (starting at level 3).',
      icon: 'identity',
      rows: [
        [
          { field: 'characterName', span: 7 },
          { field: 'ruleSetVersion', span: 5 },
        ],
        [{ field: 'classes' }],
        [{ field: 'subclass' }],
        [{ field: 'raceAndAsi' }],
        [
          { field: 'size', span: 5 },
          { field: 'alignment', span: 7 },
        ],
        [{ field: 'background' }],
      ],
    },
    {
      id: 'core-stats',
      title: 'Core Stats',
      description: 'Enter base ability scores before applying bonuses.',
      icon: 'stats',
      type: 'coreStats',
    },
    {
      id: 'languages',
      title: 'Languages',
      description: 'Track the languages granted by each source.',
      icon: 'languages',
      rows: [
        [
          { field: 'languagesRace', span: 4 },
          { field: 'languagesClass', span: 4 },
          { field: 'languagesBackground', span: 4 },
        ],
      ],
    },
    {
      id: 'skills',
      title: 'Proficient Skills',
      description: 'Note the skills earned from each origin.',
      icon: 'skills',
      rows: [
        [
          { field: 'skillsRace', span: 4 },
          { field: 'skillsClass', span: 4 },
          { field: 'skillsBackground', span: 4 },
        ],
      ],
    },
    {
      id: 'tools',
      title: 'Proficient Tools',
      description: 'List the tools your character is trained with.',
      icon: 'tools',
      rows: [
        [
          { field: 'toolsRace', span: 4 },
          { field: 'toolsClass', span: 4 },
          { field: 'toolsBackground', span: 4 },
        ],
      ],
    },
    {
      id: 'expertise',
      title: 'Expertise & Feats',
      description: 'Capture the major boosts worth sharing with your DM.',
      icon: 'expertise',
      rows: [
        [
          { field: 'expertise', span: 6 },
          { field: 'feats', span: 6 },
        ],
      ],
    },
    {
      id: 'other-choices',
      title: 'Other Class Choices',
      description: 'Log any extra selections players should know about.',
      icon: 'other',
      rows: [[{ field: 'otherChoices' }]],
    },
  ]

  return (
    <Stack spacing={4} sx={{ width: '100%', maxWidth: { xs: '100%', lg: 960 }, mx: 'auto' }}>
      {sections.map((section) => {
        const SectionIcon = section.icon ? sectionIconLookup[section.icon] : null

        return (
          <Box key={section.id} sx={cardSx}>
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
                      •
                    </Typography>
                  )}
                </Box>
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

            {section.type === 'coreStats' ? (
              <Stack spacing={{ xs: 2.25, md: 2.75 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 2.5 }}
                  justifyContent="center"
                >
                  {CORE_STAT_FIELDS.map((fieldName) => {
                    const field = fieldsByName.get(fieldName)
                    if (!field) {
                      return null
                    }

                    const label = field.label.split('(')[0].trim()
                    const rawScore = values[fieldName]
                    const modifier = computeAbilityModifier(rawScore)
                    const modifierDisplay = formatModifier(modifier)
                    const errorMessage = pointBuy.errors[fieldName]
                    const hasError = Boolean(errorMessage)

                    return (
                      <Grid
                        item
                        xs={4}
                        sm={4}
                        md={2}
                        key={fieldName}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <Box sx={{ ...statTileBaseSx, ...(hasError ? statTileErrorSx : {}) }}>
                          <Typography sx={statNameLabelSx}>{label}</Typography>
                          {renderField(fieldName, {
                            helperText: '',
                            FormHelperTextProps: { sx: { display: 'none' } },
                            InputLabelProps: { shrink: true, sx: visuallyHiddenLabelSx },
                            sx: getStatInputSx(hasError),
                          })}
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography component="span" sx={visuallyHiddenLabelSx}>
                              Modifier
                            </Typography>
                            <Box sx={getModifierPillSx(hasError)}>{modifierDisplay}</Box>
                          </Box>
                          {hasError ? (
                            <Typography
                              variant="caption"
                              sx={{ color: '#ff9bbf', fontWeight: 600, textAlign: 'center' }}
                            >
                              {errorMessage}
                            </Typography>
                          ) : null}
                        </Box>
                      </Grid>
                    )
                  })}
                </Grid>
                <Stack spacing={1.25}>
                  <Typography variant="body2" sx={{ color: pointBuyColor, fontWeight: 600 }}>
                    {pointBuyMessage}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(200, 189, 255, 0.7)' }}>
                    Use the 35 point buy calculator if you need help balancing totals.
                  </Typography>
                </Stack>
              </Stack>
            ) : (
              <Stack spacing={{ xs: 2.5, md: 3 }} sx={{ width: '100%' }}>
                {section.rows.map((row, rowIndex) => (
                  <Grid
                    container
                    key={`${section.id}-row-${rowIndex}`}
                    spacing={{ xs: 2.5, md: 3 }}
                    alignItems="stretch"
                    sx={{ width: '100%', margin: 0 }}
                  >
                    {row.map((item) => {
                      const field = fieldsByName.get(item.field)
                      if (!field) {
                        return null
                      }

                      const mdSpan = Math.min(12, Math.max(1, item.span ?? 12))
                      return (
                        <Grid
                          item
                          key={field.name}
                          xs={12}
                          sm={mdSpan}
                          md={mdSpan}
                          sx={{ display: 'flex', width: '100%' }}
                        >
                          {renderField(item.field, item.props || {})}
                        </Grid>
                      )
                    })}
                  </Grid>
                ))}
              </Stack>
            )}
          </Box>
        )
      })}
    </Stack>
  )
}

export default CreateCharacterForm
