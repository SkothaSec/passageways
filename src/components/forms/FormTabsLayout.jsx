import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'

function FormTabsLayout({ title, tabs, activeTab, onTabChange, description, children }) {
  return (
    <Container maxWidth="md" sx={{ py: 6, display: 'grid', gap: 3 }}>
      <Box sx={{ display: 'grid', gap: 1.5 }}>
        <Typography variant="h4" component="h2">
          {title}
        </Typography>
        <Tabs value={activeTab} onChange={onTabChange} variant="scrollable" allowScrollButtonsMobile>
          {tabs.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>
        {description ? (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        ) : null}
      </Box>
      {children}
    </Container>
  )
}

export default FormTabsLayout
