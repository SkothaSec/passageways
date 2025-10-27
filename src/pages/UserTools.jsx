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

const buildMarkdownFromTemplate = (template, fields, values) => {
  const valueMap = fields.reduce((accumulator, field) => {
    accumulator[field.name] = transformValue(field, values[field.name])
    return accumulator
  }, {})

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
    const output = buildMarkdownFromTemplate(activeForm.template, activeForm.fields, values)
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
          Player Character Builder
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
        <Paper elevation={3} sx={{ p: 0, overflow: 'hidden' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1.5,
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              backgroundColor: (theme) => theme.palette.grey[100],
            }}
          >
            <Typography variant="h6" sx={{ mr: 1 }}>
              Markdown Output
            </Typography>
            <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'} placement="left">
              <IconButton aria-label="Copy markdown" onClick={handleCopy} size="small">
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
