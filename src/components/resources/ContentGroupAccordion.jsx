import PropTypes from 'prop-types'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const formatRichText = (value) =>
  value
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')

const renderBullet = (text, index) => (
  <Typography
    key={`${text}-${index}`}
    component="li"
    variant="body2"
    color="text.secondary"
    sx={{ lineHeight: 1.6 }}
    dangerouslySetInnerHTML={{ __html: formatRichText(text) }}
  />
)

function ContentGroupAccordion({ groups }) {
  return (
    <Box>
      {groups.map((group) => (
        <Accordion
          key={group.id || group.title}
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
                my: { xs: 0.5, md: 0.75 },
              },
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {group.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: { xs: 1.5, md: 2 }, pb: { xs: 2, md: 2.5 } }}>
            {group.type === 'homebrew' ? (
              <Stack spacing={3}>
                {group.heroImage ? (
                  <Box sx={{ display: 'grid', gap: 1 }}>
                    <Box
                      component="img"
                      src={group.heroImage.src}
                      alt={group.heroImage.alt}
                      loading="lazy"
                      sx={{
                        width: '100%',
                        borderRadius: 3,
                        objectFit: 'cover',
                        maxHeight: 260,
                      }}
                    />
                    {group.heroImage.caption ? (
                      <Typography variant="caption" color="text.secondary">
                        {group.heroImage.caption}
                      </Typography>
                    ) : null}
                  </Box>
                ) : null}

                {group.description?.map((line, index) => (
                  <Typography key={index} variant="body2" color="text.secondary">
                    {line.text}
                    {line.link ? (
                      <>
                        <Link
                          href={line.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          underline="hover"
                          color="secondary"
                          sx={{ fontWeight: 600, mx: 0.5 }}
                        >
                          {line.link.label}
                        </Link>
                        {line.link.suffix ?? ''}
                      </>
                    ) : null}
                    {line.suffix ?? ''}
                  </Typography>
                ))}

                {group.sections?.map((section) => (
                  <Stack key={section.heading} spacing={1.25}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {section.heading}
                    </Typography>
                    <Box component="ul" sx={{ listStyle: 'disc', display: 'grid', gap: 1, pl: 3 }}>
                      {section.bullets?.map((bullet, index) => renderBullet(bullet, index))}
                    </Box>
                  </Stack>
                ))}

                {group.gallery?.length ? (
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
                      gap: 2,
                    }}
                  >
                    {group.gallery.map((item) => (
                      <Box
                        key={item.src}
                        sx={{
                          borderRadius: 3,
                          overflow: 'hidden',
                          border: '1px solid rgba(127, 90, 240, 0.24)',
                          background: 'rgba(18, 20, 38, 0.6)',
                          display: 'grid',
                          gap: 1,
                        }}
                      >
                        <Box
                          component="img"
                          src={item.src}
                          alt={item.alt}
                          loading="lazy"
                          sx={{ width: '100%', objectFit: 'cover', maxHeight: 200 }}
                        />
                        {item.caption ? (
                          <Typography variant="caption" color="text.secondary" sx={{ px: 1.5, pb: 1.5 }}>
                            {item.caption}
                          </Typography>
                        ) : null}
                      </Box>
                    ))}
                  </Box>
                ) : null}
              </Stack>
            ) : (
              <Stack spacing={2.5}>
                {group.description?.map((line, index) => (
                  <Typography key={index} variant="body2" color="text.secondary">
                    {line.text}
                    {line.link ? (
                      <>
                        {' '}
                        <Link
                          href={line.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          underline="hover"
                          color="secondary"
                          sx={{ fontWeight: 600 }}
                        >
                          {line.link.label}
                        </Link>
                        {line.link.suffix ?? ''}
                      </>
                    ) : null}
                    {line.suffix ?? ''}
                  </Typography>
                ))}

                {group.statusLegend?.length ? (
                  <Box
                    sx={{
                      display: 'grid',
                      gap: 1.5,
                      borderRadius: 3,
                      border: '1px solid rgba(127, 90, 240, 0.2)',
                      background: 'rgba(18, 20, 38, 0.5)',
                      p: { xs: 2, md: 2.5 },
                    }}
                  >
                    {group.statusLegend.map((status) => (
                      <Stack key={status.label} direction="row" spacing={2} alignItems="flex-start">
                        <Typography component="span" sx={{ fontSize: 24, lineHeight: 1 }}>
                          {status.icon}
                        </Typography>
                        <Box sx={{ display: 'grid', gap: 0.25 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {status.label}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {status.text}
                          </Typography>
                        </Box>
                      </Stack>
                    ))}
                  </Box>
                ) : null}

                {group.sections?.length ? (
                  <Stack spacing={2.5}>
                    {group.sections.map((section) => (
                      <Stack key={section.heading} spacing={1.25}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {section.heading}
                        </Typography>
                        {section.bullets?.length ? (
                          <Box component="ul" sx={{ listStyle: 'disc', display: 'grid', gap: 1, pl: 3 }}>
                            {section.bullets.map((bullet, index) => renderBullet(bullet, index))}
                          </Box>
                        ) : null}
                      </Stack>
                    ))}
                  </Stack>
                ) : null}

                {group.notes?.length ? (
                  <Box component="ul" sx={{ listStyle: 'disc', display: 'grid', gap: 1.25, pl: 3 }}>
                    {group.notes.map((note, index) => (
                      <Typography
                        key={index}
                        component="li"
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                        dangerouslySetInnerHTML={{ __html: formatRichText(note) }}
                      />
                    ))}
                  </Box>
                ) : null}
              </Stack>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

ContentGroupAccordion.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string.isRequired,
      type: PropTypes.string,
      notes: PropTypes.arrayOf(PropTypes.string),
      heroImage: PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string,
        caption: PropTypes.string,
      }),
      description: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          link: PropTypes.shape({
            href: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            suffix: PropTypes.string,
          }),
          suffix: PropTypes.string,
        }),
      ),
      statusLegend: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
        }),
      ),
      sections: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          heading: PropTypes.string.isRequired,
          bullets: PropTypes.arrayOf(PropTypes.string),
        }),
      ),
      gallery: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          alt: PropTypes.string,
          caption: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
}

export default ContentGroupAccordion
