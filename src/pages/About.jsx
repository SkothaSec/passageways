import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ContentPanel from '../components/layout/ContentPanel.jsx'
import { aboutSections } from '../data/about.js'
import loreSections from '../data/lore.js'

function About() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, display: 'grid', gap: { xs: 6, md: 8 } }}>
      <Box
        sx={{
          borderRadius: 6,
          overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(8,10,22,0.9), rgba(29,18,58,0.85))',
          border: '1px solid rgba(127, 90, 240, 0.25)',
          boxShadow: '0 30px 60px rgba(8, 6, 20, 0.35)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at top left, rgba(127,90,240,0.25), transparent 55%)',
            pointerEvents: 'none',
          }}
        />
        <Stack spacing={2.5} sx={{ p: { xs: 4, md: 6 }, position: 'relative' }}>
          <Typography variant="overline" sx={{ letterSpacing: 4, color: 'rgba(255,255,255,0.7)' }}>
            The Passageways
          </Typography>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 700 }}>
          A welcoming community!
          </Typography>
        </Stack>
      </Box>

      <ContentPanel variant="minimal" title="About The Passageways">
        <Stack spacing={3}>
          {aboutSections.map((section, index) => (
            <Box key={section.title} sx={{ display: 'grid', gap: 1.5 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {section.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {section.description}
              </Typography>
              {index < aboutSections.length - 1 ? <Divider sx={{ borderColor: 'rgba(127,90,240,0.2)' }} /> : null}
            </Box>
          ))}
        </Stack>
      </ContentPanel>

      <ContentPanel variant="minimal" title="Lore">
        <Stack spacing={3.5}>
          {loreSections.map((section) => (
            <Box key={section.title} sx={{ display: 'grid', gap: 1.5 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {section.title}
              </Typography>
              {section.paragraphs.map((paragraph, index) => (
                <Typography key={index} variant="body1" color="text.secondary">
                  {paragraph}
                </Typography>
              ))}
            </Box>
          ))}
        </Stack>
      </ContentPanel>
    </Container>
  )
}

export default About
