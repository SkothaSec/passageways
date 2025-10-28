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
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism.js'
import materialDark from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark.js'
import { dmFormOptions } from '../data/dmTemplates.js'

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

function DungeonMaster() {
  const [activeFormId, setActiveFormId] = useState(dmFormOptions[0].id)
  const activeForm = useMemo(
    () => dmFormOptions.find((form) => form.id === activeFormId) ?? dmFormOptions[0],
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
    setDiscordBlock(output)
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
          Dungeon Master Toolkit
        </Typography>
        <Tabs value={activeFormId} onChange={handleTabChange} variant="scrollable" allowScrollButtonsMobile>
          {dmFormOptions.map((form) => (
            <Tab key={form.id} value={form.id} label={form.label} />
          ))}
        </Tabs>
        <Typography variant="body2" color="text.secondary">
          {activeForm.description}
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 3 }}>
        <Stack spacing={2}>
          {activeForm.fields.map((field) => {
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
                    onChange={handleChange}
                    fullWidth
                    placeholder={field.placeholder || field.defaultValue}
                    helperText={field.helperText}
                  />
                  <Button
                    variant="outlined"
                    component="a"
                    href="https://hammertime.cyou/"
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
                onChange={handleChange}
                multiline={field.multiline}
                minRows={field.minRows}
                fullWidth
                placeholder={field.placeholder || field.defaultValue}
                helperText={field.helperText || ''}
              />
            )
          })}
        </Stack>
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

export default DungeonMaster
