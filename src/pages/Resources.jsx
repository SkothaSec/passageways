import { useState } from 'react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ContentPanel from '../components/layout/ContentPanel.jsx'
import FAQList from '../components/faq/FAQList.jsx'
import ContentGroupAccordion from '../components/resources/ContentGroupAccordion.jsx'
import ResourceDrawer from '../components/resources/ResourceDrawer.jsx'
import communityLinks from '../data/communityLinks.js'
import { faqItems, resourceLinks, serverContentGroups } from '../data/resources.js'

function Resources() {
  const [drawerOpen, setDrawerOpen] = useState(false)

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
      </Stack>

      <ContentPanel variant="minimal" title="Frequently Asked Questions">
        <FAQList items={faqItems} />
      </ContentPanel>

      <ContentPanel
        variant="minimal"
        title="Server Allowed Content"
        subtitle="Tap a category to review what’s approved across the Passageways rulesets."
      >
        <ContentGroupAccordion groups={serverContentGroups} />
      </ContentPanel>

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

      <ResourceDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        resources={resourceLinks}
      />
    </Container>
  )
}

export default Resources
