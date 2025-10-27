import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'DM Tools', path: '/dm' },
  { label: 'Player Tools', path: '/user' },
  { label: 'Mall', path: '/mall' },
]

function Navbar() {
  const location = useLocation()

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

        <Stack direction="row" spacing={1} alignItems="center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path

            return (
              <Button
                key={item.path}
                component={RouterLink}
                to={item.path}
                variant={isActive ? 'contained' : 'text'}
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
          })}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
