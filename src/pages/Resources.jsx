import { useMemo, useState } from 'react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import ContentPanel from '../components/layout/ContentPanel.jsx'
import FAQList from '../components/faq/FAQList.jsx'
import ContentGroupAccordion from '../components/resources/ContentGroupAccordion.jsx'
import ResourceDrawer from '../components/resources/ResourceDrawer.jsx'
import ResourceList from '../components/resources/ResourceList.jsx'
import communityLinks from '../data/communityLinks.js'
import { faqItems, resourceLinks, serverContentGroups } from '../data/resources.js'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

function Resources() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [query, setQuery] = useState('')
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'))

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return resourceLinks
    return resourceLinks.filter((r) => {
      return (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        (r.tags || []).some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [query])

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, display: 'grid', gap: { xs: 6, md: 8 } }}>
      <Stack spacing={1.5} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="overline" sx={{ letterSpacing: 3 }}>
          Player Toolkit
        </Typography>
        <Typography variant="h3" component="h1">
          Resources & FAQ
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 680, mx: { xs: 'auto', md: 0 } }}
        >
          Answers to the questions we hear the most
        </Typography>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent={{ xs: 'center', md: 'flex-end' }}>
        {!isDesktop ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setDrawerOpen(true)}
            sx={{
              px: 4,
              borderRadius: 999,
              fontWeight: 600,
              boxShadow: '0 16px 30px rgba(127, 90, 240, 0.3)',
            }}
          >
            Open Resource Panel
          </Button>
        ) : (
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: 420,
              p: 0.5,
              borderRadius: 999,
              bgcolor: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(127, 90, 240, 0.06)',
            }}
          >
            <InputBase
              placeholder="Search resources, tags..."
              inputProps={{ 'aria-label': 'search resources' }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ ml: 1, flex: 1 }}
            />
            <IconButton sx={{ p: '8px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <IconButton
              sx={{ p: '8px', ml: 0.5 }}
              aria-label={drawerOpen ? 'hide resources' : 'show resources'}
              onClick={() => setDrawerOpen((v) => !v)}
              title={drawerOpen ? 'Hide resources' : 'Show resources'}
            >
              {drawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          </Paper>
        )}
      </Stack>

      <ContentPanel variant="minimal" title="Frequently Asked Questions">
        <FAQList items={faqItems} />
      </ContentPanel>

      <Box id="server-allowed-content" sx={{ scrollMarginTop: { xs: 96, md: 128 } }}>
        <ContentPanel
          variant="minimal"
          title="Server Allowed Content"
          subtitle="Tap a category to review what’s approved across the Passageways rulesets."
        >
          <ContentGroupAccordion groups={serverContentGroups} />
        </ContentPanel>
      </Box>

      <ContentPanel
        variant="minimal"
        title="Need More Help?"
        subtitle="Our crew is always online to help you find a table or prep your next adventure."
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent={{ xs: 'center', sm: 'flex-start' }}
        >
          <Button
            variant="contained"
            color="primary"
            href={communityLinks.discord}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join the Discord
          </Button>
          <Button
            variant="outlined"
            color="primary"
            href={communityLinks.patreon}
            target="_blank"
            rel="noopener noreferrer"
          >
            Support on Patreon
          </Button>
        </Stack>
      </ContentPanel>

      <ResourceDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} resources={filtered} />

      {/* Desktop sticky sidebar: show filtered resources directly for faster discovery */}
      {isDesktop && drawerOpen ? (
        <Paper
          elevation={0}
          sx={{
            position: 'fixed',
            right: 28,
            top: 96,
            width: 360,
            maxHeight: 'calc(100vh - 112px)',
            p: 3,
            overflow: 'auto',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Resources
            </Typography>
            <IconButton
              size="small"
              aria-label="close resources"
              onClick={() => setDrawerOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <ResourceList items={filtered} />
        </Paper>
      ) : null}
    </Container>
  )
}

export default Resources
