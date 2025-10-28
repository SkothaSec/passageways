import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useState } from 'react'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'DM Tools', path: '/dm' },
  { label: 'Player Tools', path: '/user' },
  { label: 'Mall', path: '/mall' },
]

function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleDrawer = (open) => () => {
    setMobileOpen(open)
  }
  const handleNavClick = () => {
    setMobileOpen(false)
  }

  const navButtons = (variant = 'text') =>
    navItems.map((item) => {
      const isActive = location.pathname === item.path

      return (
        <Button
          key={item.path}
          component={RouterLink}
          to={item.path}
          onClick={handleNavClick}
          variant={isActive ? 'contained' : variant}
          color={isActive ? 'primary' : 'inherit'}
          sx={{
            px: 2.5,
            py: 0.75,
            borderRadius: 999,
            fontWeight: 500,
            color: isActive ? 'primary.contrastText' : 'text.secondary',
            backgroundColor: isActive ? 'primary.main' : 'transparent',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: isActive
                ? 'primary.dark'
                : 'rgba(127, 90, 240, 0.15)',
              color: 'primary.contrastText',
            },
          }}
        >
          {item.label}
        </Button>
      )
    })

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="primary"
      sx={{
        background: (theme) =>
          `linear-gradient(135deg, rgba(12, 14, 24, 0.85), rgba(21, 18, 34, 0.75))`,
        borderBottom: '1px solid rgba(127, 90, 240, 0.35)',
      }}
    >
      <Toolbar sx={{ py: 1.5, px: { xs: 2, md: 4 }, gap: 3 }}>
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <Box
            sx={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7f5af0, #2cb1bc)',
              boxShadow: '0 0 18px rgba(127, 90, 240, 0.5)',
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <Typography variant="subtitle2" sx={{ letterSpacing: 4, fontSize: 11 }}>
              LIMINAL HUB
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              The Passageways
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          {navButtons()}
        </Stack>

        <IconButton
          color="inherit"
          sx={{ display: { xs: 'flex', md: 'none' } }}
          onClick={toggleDrawer(true)}
          aria-label="Open navigation"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: '80%',
            maxWidth: 320,
            background: 'linear-gradient(135deg, rgba(17,18,35,0.95), rgba(26,18,42,0.95))',
            borderLeft: '1px solid rgba(127, 90, 240, 0.35)',
            backdropFilter: 'blur(18px)',
            display: 'grid',
            gridTemplateRows: 'auto 1fr',
            p: 2.5,
            gap: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Navigate
          </Typography>
          <IconButton color="inherit" onClick={toggleDrawer(false)} aria-label="Close navigation">
            <CloseIcon />
          </IconButton>
        </Box>
        <Stack spacing={1.5}>{navButtons('outlined')}</Stack>
      </Drawer>
    </AppBar>
  )
}

export default Navbar
