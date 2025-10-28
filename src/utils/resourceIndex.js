import { serverContentGroups } from '../data/resources.js'

const slugify = (value = '') =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const joinDescription = (description = []) =>
  description
    .map((entry) => {
      const link = entry.link ? ` ${entry.link.label}` : ''
      return `${entry.text}${link}${entry.suffix ?? ''}`
    })
    .join(' ')

const joinBullets = (bullets = []) => bullets.join(' ')

export const resourceIndex = serverContentGroups.flatMap((group) => {
  const groupId = group.id || slugify(group.title)
  const entries = [
    {
      id: groupId,
      type: 'group',
      title: group.title,
      body: [joinDescription(group.description), joinBullets(group.notes)].filter(Boolean).join(' '),
      keywords: group.keywords || [],
    },
  ]

  group.sections?.forEach((section) => {
    const sectionId = section.id || slugify(`${groupId}-${section.heading}`)
    entries.push({
      id: sectionId,
      type: 'section',
      groupId,
      title: section.heading,
      body: joinBullets(section.bullets),
      keywords: section.keywords || [],
    })
  })

  return entries
})

export const searchResources = (query) => {
  const normalized = query.trim().toLowerCase()
  if (!normalized) {
    return resourceIndex
  }

  return resourceIndex.filter((entry) => {
    return (
      entry.title.toLowerCase().includes(normalized) ||
      entry.body.toLowerCase().includes(normalized) ||
      entry.keywords.some((keyword) => keyword.toLowerCase().includes(normalized))
    )
  })
}

export default resourceIndex
