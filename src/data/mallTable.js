export const mallColumns = [
  { id: 'tier', label: 'Tier' },
  { id: 'name', label: 'Name' },
  { id: 'source', label: 'Source' },
  { id: 'rarity', label: 'Rarity' },
  { id: 'type', label: 'Type' },
  { id: 'attunement', label: 'Attunement' },
  { id: 'value', label: 'Value (gp)' },
  { id: 'note', label: 'Notes' },
]

export const MALL_SHEET_ID = '1j_RwhjN9d9G546eyPmGsG5w4HOQZmmyLT5RYrAnXzas'

export const MALL_SHEETS = [
  {
    id: 'wondrous-items',
    label: 'Wondrous Items',
    sheet: 'Wondrous Item',
    gid: '277226745',
    columns: {
      name: 'Name',
      type: 'Type',
      value: 'Value',
      note: 'Note',
    },
  },
  {
    id: 'magical-knickknacks',
    label: 'Magical Knickknacks',
    sheet: 'Magical Knicknacks',
    columns: {
      attunement: 'ATN',
    },
  },
  {
    id: 'weapons',
    label: 'Weapons',
    sheet: 'Weapons',
    columns: {
      type: 'Weapon Type',
      value: 'Cost',
      note: 'Notes',
    },
  },
  {
    id: 'ammunition',
    label: 'Ammunition',
    sheet: 'Ammunition',
    columns: {
      value: 'Cost',
      note: 'Notes',
    },
  },
  {
    id: 'potions',
    label: 'Potions',
    sheet: 'Potions',
    columns: {
      name: 'Potion',
      type: 'Effect',
      value: 'Cost',
      note: 'Notes',
    },
  },
  {
    id: 'rings',
    label: 'Rings',
    sheet: 'Rings',
    columns: {
      name: 'Ring',
      value: 'Cost',
      note: 'Notes',
    },
  },
  {
    id: 'artifacts',
    label: 'Artifacts',
    sheet: 'Artifacts',
    columns: {
      name: 'ALL ITEMS LISTED HERE ARE SESSION REQUIRED Name',
      source: 'Origin',
      value: 'Value',
      note: 'Notes',
    },
  },
  {
    id: 'tattoos',
    label: 'Tattoos',
    sheet: 'Tattoos',
    columns: {
      name: 'KEEP IN MIND: Tattoos cover certain body parts. They cannot overlap with other tattoos. Name',
      type: 'Type',
      value: 'Cost',
      note: 'Note (Body Coverage)',
    },
  },
  {
    id: 'bookstore',
    label: 'Bookstore',
    sheet: 'Bookstore',
    columns: {
      tier: 'Section',
      name: 'Title',
      source: 'Author',
      value: 'Cost',
      note: 'Summary',
    },
  },
]

export const buildMallSheetUrl = (sheet) => {
  if (sheet?.gid) {
    return `https://docs.google.com/spreadsheets/d/${MALL_SHEET_ID}/gviz/tq?tqx=out:json&gid=${sheet.gid}`
  }

  const sheetName = typeof sheet === 'string' ? sheet : sheet?.sheet
  return `https://docs.google.com/spreadsheets/d/${MALL_SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName || 'Sheet1')}`
}

export const buildMallSheetViewUrl = (sheet) => {
  if (sheet.gid) {
    return `https://docs.google.com/spreadsheets/d/${MALL_SHEET_ID}/edit#gid=${sheet.gid}`
  }

  return `https://docs.google.com/spreadsheets/d/${MALL_SHEET_ID}/edit`
}

const BOOL_MARKERS = new Set(['✔', 'TRUE', 'True', 'true', 'Yes', 'Y'])

const FIVEETOOLS_ITEMS_BASE_URL = 'https://5e.tools/items.html'

const DEFAULT_COLUMN_ALIASES = {
  tier: ['tier', 'category', 'section'],
  name: ['name', 'item', 'title', 'artifact', 'potion', 'ring', 'tattoo'],
  source: ['source', 'origin', 'author'],
  rarity: ['rarity'],
  type: ['type', 'weapon type', 'effect', 'placement'],
  attunement: ['attunement', 'atn'],
  value: ['value', 'cost', 'price'],
  note: ['note', 'notes', 'summary', 'description'],
}

const coerceAttunement = (value) => {
  if (!value) {
    return '—'
  }

  return BOOL_MARKERS.has(value) ? 'Required' : value
}

const normalizeFiveEToolsSource = (value) => {
  if (!value) {
    return 'homebrew'
  }

  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim() || 'homebrew'
}

const buildFiveEToolsItemUrl = (name, source) => {
  if (!name) {
    return ''
  }

  const normalizedName = encodeURIComponent(name.trim().toLowerCase())
    .replace(/%28/g, '(')
    .replace(/%29/g, ')')

  const sourceToken = normalizeFiveEToolsSource(source)

  return `${FIVEETOOLS_ITEMS_BASE_URL}#${normalizedName}${sourceToken ? `_${sourceToken}` : ''}`
}

export const parseMallResponse = (payloadText, sheetConfig = {}) => {
  if (!payloadText) {
    return []
  }

  const start = payloadText.indexOf('{')
  const end = payloadText.lastIndexOf('}')
  if (start === -1 || end === -1) {
    return []
  }

  const response = JSON.parse(payloadText.substring(start, end + 1))
  const cols = response.table?.cols ?? []
  const columnLookup = cols.reduce((accumulator, column, index) => {
    if (column?.label) {
      const normalized = column.label.trim().toLowerCase()
      accumulator[normalized] = { index, label: column.label }
    }
    return accumulator
  }, {})

  const resolveLabel = (field) => {
    const explicit = sheetConfig.columns?.[field]
    if (explicit) {
      const normalized = explicit.trim().toLowerCase()
      if (columnLookup[normalized]) {
        return columnLookup[normalized].label
      }
    }

    const candidates = [explicit, ...(DEFAULT_COLUMN_ALIASES[field] || [])].filter(Boolean)

    for (const candidate of candidates) {
      const normalized = candidate.trim().toLowerCase()
      if (columnLookup[normalized]) {
        return columnLookup[normalized].label
      }
    }

    // Fallback to the field name itself
    const normalizedField = field.trim().toLowerCase()
    return columnLookup[normalizedField]?.label
  }

  const getCell = (cells, label) => {
    if (!label) {
      return { formatted: '', raw: '', link: '' }
    }

    const normalized = label.trim().toLowerCase()
    const match = columnLookup[normalized]
    if (!match) {
      return { formatted: '', raw: '', link: '' }
    }

    const cell = cells[match.index] || {}
    return {
      formatted: typeof cell.f === 'string' ? cell.f : typeof cell.v === 'string' ? cell.v : cell.v ?? '',
      raw: cell.v,
      link: cell.p?.link || '',
    }
  }

  let previousTier = ''
  const rows = []

  for (const row of response.table?.rows ?? []) {
    const cells = row.c || []
    const tierCell = getCell(cells, resolveLabel('tier'))
    const tier = tierCell.formatted?.trim() || previousTier || 'Unspecified'
    const nameCell = getCell(cells, resolveLabel('name'))
    const name = nameCell.formatted?.trim()

    previousTier = tier

    if (!name) {
      continue
    }

    const attunementCell = getCell(cells, resolveLabel('attunement'))
    const valueCell = getCell(cells, resolveLabel('value'))

    const source = getCell(cells, resolveLabel('source')).formatted?.trim() || ''
    const rarity = getCell(cells, resolveLabel('rarity')).formatted?.trim() || ''
    const type = getCell(cells, resolveLabel('type')).formatted?.trim() || ''
    const note = getCell(cells, resolveLabel('note')).formatted?.trim() || ''
    const attunement = coerceAttunement(attunementCell.formatted?.trim() || attunementCell.raw)
    const value = typeof valueCell.formatted === 'string' ? valueCell.formatted : valueCell.raw ?? ''

    rows.push({
      tier,
      name,
      url: buildFiveEToolsItemUrl(name, source) || nameCell.link,
      source,
      rarity,
      type,
      attunement,
      value,
      note,
    })
  }

  return rows
}
