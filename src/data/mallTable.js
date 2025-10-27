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

export const MALL_SHEET_GVIZ_URL =
  'https://docs.google.com/spreadsheets/d/1j_RwhjN9d9G546eyPmGsG5w4HOQZmmyLT5RYrAnXzas/gviz/tq?tqx=out:json&gid=277226745'

const BOOL_MARKERS = new Set(['✔', 'TRUE', 'True', 'true', 'Yes', 'Y'])

const coerceAttunement = (value) => {
  if (!value) {
    return '—'
  }

  return BOOL_MARKERS.has(value) ? 'Required' : value
}

export const parseMallResponse = (payloadText) => {
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
  const colIndex = cols.reduce((accumulator, column, index) => {
    if (column?.label) {
      accumulator[column.label] = index
    }
    return accumulator
  }, {})

  const getCell = (cells, label) => {
    const index = colIndex[label]
    if (typeof index !== 'number') {
      return { formatted: '', raw: '', link: '' }
    }

    const cell = cells[index] || {}
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
    const tierCell = getCell(cells, 'Tier')
    const tier = tierCell.formatted?.trim() || previousTier || 'Unspecified'
    const nameCell = getCell(cells, 'Name')
    const name = nameCell.formatted?.trim()

    previousTier = tier

    if (!name) {
      continue
    }

    const attunementCell = getCell(cells, 'ATN')
    const valueCell = getCell(cells, 'Value')

    rows.push({
      tier,
      name,
      url: nameCell.link,
      source: getCell(cells, 'Source').formatted?.trim() || '',
      rarity: getCell(cells, 'Rarity').formatted?.trim() || '',
      type: getCell(cells, 'Type').formatted?.trim() || '',
      attunement: coerceAttunement(attunementCell.formatted?.trim() || attunementCell.raw),
      value: typeof valueCell.formatted === 'string' ? valueCell.formatted : valueCell.raw ?? '',
      note: getCell(cells, 'Note').formatted?.trim() || '',
    })
  }

  return rows
}
