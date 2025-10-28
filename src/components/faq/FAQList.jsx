import { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'

const toPanelId = (value, index) =>
  `${value}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .concat(`-${index}`)

function FAQList({ items }) {
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(() => new Set())

  const preparedItems = useMemo(
    () =>
      items.map((item, index) => ({
        id: toPanelId(item.id ?? item.question, index),
        item,
      })),
    [items],
  )

  const filteredItems = useMemo(() => {
    const trimmed = query.trim().toLowerCase()
    if (!trimmed) return preparedItems
    return preparedItems.filter(({ item }) => {
      const answersText = Array.isArray(item.answers)
        ? item.answers
            .map((answer) => `${answer.text} ${answer.after ?? ''} ${answer.link?.label ?? ''}`)
            .join(' ')
            .toLowerCase()
        : (item.answer ?? '').toLowerCase()

      return (
        item.question.toLowerCase().includes(trimmed) ||
        answersText.includes(trimmed)
      )
    })
  }, [preparedItems, query])

  useEffect(() => {
    setExpanded((prev) => {
      const allowed = new Set(filteredItems.map(({ id }) => id))
      const next = new Set([...prev].filter((id) => allowed.has(id)))
      return next.size === prev.size ? prev : next
    })
  }, [filteredItems])

  const togglePanel = (panelId, isExpanded) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (isExpanded) {
        next.add(panelId)
      } else {
        next.delete(panelId)
      }
      return next
    })
  }

  const expandAll = () => {
    setExpanded(new Set(filteredItems.map(({ id }) => id)))
  }

  const collapseAll = () => {
    setExpanded(new Set())
  }

  return (
    <Box>
      <Stack
        spacing={1.5}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'stretch', md: 'center' }}
        justifyContent="space-between"
        sx={{ mb: 2.5 }}
      >
        <TextField
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search questions"
          size="small"
          variant="outlined"
          aria-label="Search frequently asked questions"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{
            minWidth: { xs: '100%', md: 320 },
            bgcolor: 'rgba(255,255,255,0.05)',
            borderRadius: 999,
          }}
        />
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button
            size="small"
            variant="outlined"
            onClick={expandAll}
            disabled={filteredItems.length === 0 || expanded.size === filteredItems.length}
          >
            Expand all
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={collapseAll}
            disabled={expanded.size === 0}
          >
            Collapse all
          </Button>
        </Stack>
      </Stack>

      {filteredItems.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No questions match your search.
        </Typography>
      ) : (
        filteredItems.map(({ id, item }) => {
          const panelId = `${id}-panel`
          const summaryId = `${id}-summary`
          const isExpanded = expanded.has(id)

          return (
            <Accordion
              key={id}
              expanded={isExpanded}
              onChange={(_, next) => togglePanel(id, next)}
              disableGutters
              square
              sx={{
                backgroundColor: 'transparent',
                borderBottom: '1px solid rgba(127, 90, 240, 0.2)',
                '&::before': { display: 'none' },
              }}
            >
              <AccordionSummary
                id={summaryId}
                aria-controls={panelId}
                expandIcon={<ExpandMoreIcon sx={{ color: 'rgba(255,255,255,0.75)' }} />}
                sx={{
                  px: { xs: 1.5, md: 2 },
                  '& .MuiAccordionSummary-content': {
                    my: { xs: 0.75, md: 1 },
                  },
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                id={panelId}
                role="region"
                aria-labelledby={summaryId}
                sx={{ px: { xs: 1.5, md: 2 }, pb: { xs: 2, md: 2.5 } }}
              >
                {Array.isArray(item.answers) ? (
                  <Box
                    component="ul"
                    sx={{
                      listStyle: 'disc',
                      pl: 3,
                      display: 'grid',
                      gap: 1.5,
                    }}
                  >
                    {item.answers.map((answer, answerIndex) => (
                      <Typography
                        key={answerIndex}
                        component="li"
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                      >
                        {answer.bold ? <strong>{answer.text}</strong> : answer.text}
                        {answer.link ? (
                          <>
                            {' '}
                            <Link
                              href={answer.link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              underline="hover"
                              color="secondary"
                              sx={{ fontWeight: 600 }}
                            >
                              {answer.link.label}
                            </Link>
                            {answer.link.suffix ? answer.link.suffix : null}
                          </>
                        ) : null}
                        {answer.after ? answer.after : null}
                      </Typography>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    {item.answer}
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          )
        })
      )}
    </Box>
  )
}

FAQList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      question: PropTypes.string.isRequired,
      answer: PropTypes.string,
      answers: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          bold: PropTypes.bool,
          after: PropTypes.string,
          link: PropTypes.shape({
            href: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            suffix: PropTypes.string,
          }),
        }),
      ),
    }),
  ).isRequired,
}

export default FAQList
