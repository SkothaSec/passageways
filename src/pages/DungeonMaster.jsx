import { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormTabsLayout from '../components/forms/FormTabsLayout.jsx'
import MarkdownPreview from '../components/forms/MarkdownPreview.jsx'
import DungeonMasterForm from '../components/dm-tools/DungeonMasterForm.jsx'
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
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setValues(buildInitialValues(activeForm))
    setMarkdown('')
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
  }

  const handleCopy = async () => {
    if (!markdown) {
      return
    }

    try {
      await navigator.clipboard.writeText(markdown)
      setCopied(true)
    } catch (error) {
      console.error('Failed to copy markdown to clipboard', error)
    }
  }

  return (
    <FormTabsLayout
      title="Dungeon Master Toolkit"
      tabs={dmFormOptions.map((form) => ({ value: form.id, label: form.label }))}
      activeTab={activeFormId}
      onTabChange={handleTabChange}
      description={activeForm.description}
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 3 }}>
        <DungeonMasterForm form={activeForm} values={values} onChange={handleChange} />
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            width: '100%',
            borderRadius: '999px',
            py: 2,
            fontWeight: 700,
            letterSpacing: '0.05em',
            background: 'linear-gradient(135deg, rgba(176, 84, 255, 0.95), rgba(116, 90, 255, 0.88))',
            boxShadow: '0 16px 45px rgba(104, 58, 196, 0.55)',
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(196, 104, 255, 0.98), rgba(136, 110, 255, 0.92))',
              boxShadow: '0 18px 54px rgba(104, 58, 196, 0.65)',
            },
          }}
        >
          Generate Markdown
        </Button>
      </Box>

      <MarkdownPreview content={markdown} copied={copied} onCopy={handleCopy} />
    </FormTabsLayout>
  )
}

export default DungeonMaster
