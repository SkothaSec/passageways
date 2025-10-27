import { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
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

  useEffect(() => {
    setValues(buildInitialValues(activeForm))
    setMarkdown('')
    setDiscordBlock('')
  }, [activeForm])

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
        <Button type="submit" variant="contained" size="large">
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
