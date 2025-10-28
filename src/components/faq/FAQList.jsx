import PropTypes from 'prop-types'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

function FAQList({ items }) {
  return (
    <Box>
      {items.map((item) => (
        <Accordion
          key={item.question}
          disableGutters
          square
          sx={{
            backgroundColor: 'transparent',
            borderBottom: '1px solid rgba(127, 90, 240, 0.2)',
            '&::before': { display: 'none' },
          }}
        >
          <AccordionSummary
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
          <AccordionDetails sx={{ px: { xs: 1.5, md: 2 }, pb: { xs: 2, md: 2.5 } }}>
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
                {item.answers.map((answer, index) => (
                  <Typography
                    key={index}
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
      ))}
    </Box>
  )
}

FAQList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
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
