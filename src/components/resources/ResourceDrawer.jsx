import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import ResourceList from './ResourceList.jsx'

function ResourceDrawer({ open, onClose, resources }) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 380 },
          background: 'linear-gradient(135deg, rgba(18, 20, 38, 0.95), rgba(28, 22, 48, 0.98))',
          borderLeft: '1px solid rgba(127, 90, 240, 0.35)',
          backdropFilter: 'blur(14px)',
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          p: { xs: 2.5, sm: 3 },
          gap: 2,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Adventuring Resources
        </Typography>
        <Button color="inherit" variant="text" onClick={onClose}>
          Close
        </Button>
      </Box>

      <Box sx={{ overflowY: 'auto', pr: 1 }}>
        <ResourceList items={resources} />
      </Box>

      <Typography variant="caption" color="text.secondary">
        Curated by Passengers. Suggest additions in the Discord feedback channel.
      </Typography>
    </Drawer>
  )
}

ResourceDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  resources: PropTypes.array.isRequired,
}

export default ResourceDrawer
