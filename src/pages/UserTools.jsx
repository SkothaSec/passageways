import { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormTabsLayout from '../components/forms/FormTabsLayout.jsx'
import MarkdownPreview from '../components/forms/MarkdownPreview.jsx'
import StandardFormFields from '../components/forms/StandardFormFields.jsx'
import CreateCharacterForm, {
  CORE_STAT_FIELDS,
} from '../components/user-tools/CreateCharacterForm.jsx'
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

const abilityScoreCost = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
  16: 12,
  17: 15,
  18: 19,
}

const calculatePointBuy = (values) => {
  let total = 0
  let missingScores = false
  let hasInvalidScores = false
  const errors = {}

  CORE_STAT_FIELDS.forEach((fieldName) => {
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

    if (score < 8 || score > 18) {
      errors[fieldName] = 'Score must be between 8 and 18'
      hasInvalidScores = true
      return
    }

    const cost = abilityScoreCost[score]

    if (cost === undefined) {
      errors[fieldName] = 'Score must be between 8 and 18'
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
      CORE_STAT_FIELDS.forEach((fieldName) => {
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

  const formFields = isCreateCharacter ? (
    <CreateCharacterForm
      form={activeForm}
      values={values}
      onChange={handleChange}
      onUpdateValues={setValues}
      pointBuy={pointBuy}
    />
  ) : (
    <StandardFormFields fields={activeForm.fields} values={values} onChange={handleChange} />
  )

  return (
    <FormTabsLayout
      title="Player Character Tools"
      tabs={userFormOptions.map((form) => ({ value: form.id, label: form.label }))}
      activeTab={activeFormId}
      onTabChange={handleTabChange}
      description={activeForm.description}
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 3 }}>
        {formFields}
        <Button type="submit" variant="contained" size="large" sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Generate Markdown
        </Button>
      </Box>

      <MarkdownPreview content={markdown ? discordBlock : ''} copied={copied} onCopy={handleCopy} />
    </FormTabsLayout>
  )
}

export default UserTools
