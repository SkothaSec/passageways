import { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import MenuItem from '@mui/material/MenuItem'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism'
import materialDark from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark'
import { userFormOptions } from '../data/userTemplates.js'

const buildInitialValues = (form) =>
  form.fields.reduce((accumulator, field) => {
    accumulator[field.name] = ''
    return accumulator
  }, {})

const transformValue = (field, rawValue) => {
  const trimmed = rawValue?.trim()
  const fallback = field.defaultValue || ''

  if (field.transform === 'list') {
    if (!trimmed) {
      return fallback
    }

    const items = trimmed
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)

    if (!items.length) {
      return fallback
    }

    return items.map((item) => (item.startsWith('-') ? item : `- ${item}`)).join('\n')
  }

  return trimmed || fallback
}

const parseLineCost = (line) => {
  const match = line.match(/[\-–]\s*([0-9.,]+)\s*([kKmM]?)/)
  if (!match) {
    return 0
  }

  const amount = parseFloat(match[1].replace(/,/g, ''))
  if (Number.isNaN(amount)) {
    return 0
  }

  const unit = match[2]?.toLowerCase()
  const multiplier = unit === 'm' ? 1_000_000 : unit === 'k' ? 1_000 : 1
  return amount * multiplier
}

const formatTotal = (value) => {
  if (!value) {
    return '0'
  }

  if (value % 1_000_000 === 0 && value >= 1_000_000) {
    return `${value / 1_000_000}m`
  }

  if (value % 1_000 === 0 && value >= 1_000) {
    return `${value / 1_000}k`
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, '')}k`
  }

  return `${value}`
}

const buildMarkdownFromTemplate = (form, values) => {
  const { template, fields, id } = form

  const valueMap = fields.reduce((accumulator, field) => {
    accumulator[field.name] = transformValue(field, values[field.name])
    return accumulator
  }, {})

  if (id === 'purchaseFromMall') {
    const mention = (values.mention || valueMap.mention || '').trim()
    let summaryRaw = (values.summary || valueMap.summary || '').trim()
    const headerParts = []

    if (mention) {
      headerParts.push(mention)
    }

    if (!summaryRaw && mention) {
      summaryRaw = 'logs a purchase'
    }

    if (summaryRaw) {
      const summary = summaryRaw.endsWith(':') ? summaryRaw : `${summaryRaw}:`
      headerParts.push(summary)
    }

    const itemsLines = (values.items || valueMap.items || '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)

    const total = itemsLines.reduce((accumulator, line) => accumulator + parseLineCost(line), 0)

    const purchaseHeader = headerParts.join(' ').trim()
    valueMap.purchaseHeader = purchaseHeader || 'Purchase Log:'
    valueMap.itemsFormatted = itemsLines.join('\n')
    valueMap.totalFormatted = formatTotal(total)

    const notes = (values.notes || valueMap.notes || '').trim()
    valueMap.notesSection = notes ? `\n\n${notes}` : ''
  }

  return template.replace(/{{(\w+)}}/g, (_, key) => valueMap[key] ?? '')
}

const coreStatFields = ['strScore', 'dexScore', 'conScore', 'intScore', 'wisScore', 'chaScore']

const abilityScoreCost = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
}

const calculatePointBuy = (values) => {
  let total = 0
  let missingScores = false
  let hasInvalidScores = false
  const errors = {}

  coreStatFields.forEach((fieldName) => {
    const raw = values[fieldName]

    if (raw === undefined || raw === '') {
      missingScores = true
      return
    }

    const score = Number(raw)

    if (!Number.isInteger(score)) {
      errors[fieldName] = 'Use whole numbers only'
      hasInvalidScores = true
      return
    }

    if (score < 8 || score > 15) {
      errors[fieldName] = 'Score must be between 8 and 15'
      hasInvalidScores = true
      return
    }

    const cost = abilityScoreCost[score]

    if (cost === undefined) {
      errors[fieldName] = 'Score must be between 8 and 15'
      hasInvalidScores = true
      return
    }

    total += cost
  })

  return {
    total,
    missingScores,
    hasInvalidScores,
    errors,
  }
}

function UserTools() {
  const [activeFormId, setActiveFormId] = useState(userFormOptions[0].id)
  const activeForm = useMemo(
    () => userFormOptions.find((form) => form.id === activeFormId) ?? userFormOptions[0],
    [activeFormId],
  )

  const [values, setValues] = useState(() => buildInitialValues(activeForm))
  const [markdown, setMarkdown] = useState('')
  const [discordBlock, setDiscordBlock] = useState('')
  const [copied, setCopied] = useState(false)

  const isCreateCharacter = activeForm.id === 'createCharacter'

  const fieldsByName = useMemo(() => {
    const map = new Map()
    activeForm.fields.forEach((field) => {
      map.set(field.name, field)
    })
    return map
  }, [activeForm.fields])

  useEffect(() => {
    const initialValues = buildInitialValues(activeForm)

    if (isCreateCharacter) {
      coreStatFields.forEach((fieldName) => {
        const defaultScore = fieldsByName.get(fieldName)?.defaultValue
        initialValues[fieldName] = defaultScore ?? '8'
      })
    }

    setValues(initialValues)
    setMarkdown('')
    setDiscordBlock('')
  }, [activeForm, fieldsByName, isCreateCharacter])

  useEffect(() => {
    if (!copied) {
      return undefined
    }

    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  const handleTabChange = (_, nextFormId) => {
    setActiveFormId(nextFormId)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const output = buildMarkdownFromTemplate(activeForm, values)
    setMarkdown(output)
    setDiscordBlock(`\`\`\`markdown\n${output}\n\`\`\``)
  }

  const handleCopy = async () => {
    if (!discordBlock) {
      return
    }

    try {
      await navigator.clipboard.writeText(discordBlock)
      setCopied(true)
    } catch (error) {
      console.error('Failed to copy markdown to clipboard', error)
    }
  }

  const pointBuy = useMemo(() => {
    if (!isCreateCharacter) {
      return {
        total: 0,
        missingScores: true,
        hasInvalidScores: false,
        errors: {},
      }
    }

    return calculatePointBuy(values)
  }, [isCreateCharacter, values])

  const renderField = (name, extraProps = {}) => {
    const field = fieldsByName.get(name)

    if (!field) {
      return null
    }

    const isStatField = isCreateCharacter && coreStatFields.includes(field.name)
    const errorMessage = isStatField ? pointBuy.errors[field.name] : undefined

    if (isCreateCharacter && field.name === 'ruleSetVersion') {
      const handleVersionChange = (_, next) => {
        if (!next) {
          return
        }
        setValues((prev) => ({ ...prev, ruleSetVersion: next }))
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

    if (isCreateCharacter && field.name === 'alignment') {
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
            onChange={handleChange}
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
        onChange={handleChange}
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
                max: 15,
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

  const renderCreateCharacterForm = () => {
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {renderField('classes')}
            </Grid>
            <Grid item xs={12} md={6}>
              {renderField('subclass')}
            </Grid>
            <Grid item xs={12}>
              {renderField('raceAndAsi')}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
              {renderField('size', { fullWidth: true, sx: { width: '100%' } })}
            </Grid>
            <Grid item xs={12} md={8} sx={{ display: 'flex' }}>
              {renderField('alignment', { fullWidth: true })}
            </Grid>
          </Grid>
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
            {coreStatFields.map((fieldName) => (
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

  const renderFormFields = () => {
    if (isCreateCharacter) {
      return renderCreateCharacterForm()
    }

    return (
      <Stack spacing={2}>
        {activeForm.fields.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            value={values[field.name] ?? ''}
            onChange={handleChange}
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

  return (
    <Container maxWidth="md" sx={{ py: 6, display: 'grid', gap: 3 }}>
      <Box sx={{ display: 'grid', gap: 1.5 }}>
        <Typography variant="h4" component="h2">
          Player Character Tools
        </Typography>
        <Tabs value={activeFormId} onChange={handleTabChange} variant="scrollable" allowScrollButtonsMobile>
          {userFormOptions.map((form) => (
            <Tab key={form.id} value={form.id} label={form.label} />
          ))}
        </Tabs>
        <Typography variant="body2" color="text.secondary">
          {activeForm.description}
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 3 }}>
        {renderFormFields()}
        <Button type="submit" variant="contained" size="large" sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Generate Markdown
        </Button>
      </Box>

      {markdown && (
        <Paper
          elevation={6}
          sx={{
            p: 0,
            overflow: 'hidden',
            border: '1px solid rgba(127, 90, 240, 0.35)',
            background: 'linear-gradient(135deg, rgba(18,20,38,0.85), rgba(27,20,45,0.9))',
            backdropFilter: 'blur(16px)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2.5,
              py: 1.75,
              borderBottom: '1px solid rgba(127, 90, 240, 0.35)',
              background: 'linear-gradient(135deg, rgba(28, 22, 48, 0.95), rgba(46, 28, 68, 0.9))',
              color: 'text.primary',
            }}
          >
            <Typography variant="h6" sx={{ mr: 1, fontWeight: 600 }}>
              Markdown Output
            </Typography>
            <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'} placement="left">
              <IconButton aria-label="Copy markdown" onClick={handleCopy} size="small" color="primary">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ backgroundColor: '#1e1e1e' }}>
            <SyntaxHighlighter
              language="markdown"
              style={materialDark}
              customStyle={{ margin: 0, borderRadius: 0, backgroundColor: '#1e1e1e' }}
            >
              {discordBlock}
            </SyntaxHighlighter>
          </Box>
        </Paper>
      )}
    </Container>
  )
}

export default UserTools
