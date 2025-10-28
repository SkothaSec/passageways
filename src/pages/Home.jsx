import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import communityLinks from '../data/communityLinks.js'
import heroVideo from '../assets/media/passageways_welcome.mov'

function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, display: 'grid', gap: { xs: 6, md: 8 } }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' },
          alignItems: 'center',
          gap: { xs: 4, md: 6 },
        }}
      >
        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, display: 'grid', gap: 2 }}>
          <Typography variant="overline" sx={{ letterSpacing: 3 }}>
            The Passageways
          </Typography>
          <Typography variant="h3" component="h1">
            Liminal Adventures Await
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Explore the nexus of realms, gather allies, and weave your own threads through the backrooms.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent={{ xs: 'center', md: 'flex-start' }}
            sx={{ pt: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href={communityLinks.discord}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the Discord
            </Button>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              href={communityLinks.patreon}
              target="_blank"
              rel="noopener noreferrer"
            >
              Support on Patreon
            </Button>
          </Stack>
        </Box>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: { xs: '9 / 16', md: '3 / 4' },
            borderRadius: 6,
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.45)',
            border: '1px solid rgba(127, 90, 240, 0.35)',
            background:
              'radial-gradient(circle at top, rgba(127,90,240,0.35) 0%, rgba(5,5,12,0.75) 60%, rgba(5,5,12,0.95) 100%)',
          }}
        >
          <Box
            component="video"
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'saturate(1.1) contrast(1.05)',
            }}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default Home
