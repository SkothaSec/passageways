import { alpha, createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7f5af0',
      contrastText: '#f5f7ff',
    },
    secondary: {
      main: '#2cb1bc',
    },
    background: {
      default: '#05050c',
      paper: alpha('#0f172a', 0.85),
    },
    text: {
      primary: '#f5f7ff',
      secondary: '#c0c4d6',
    },
  },
  typography: {
    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    button: { fontWeight: 600, letterSpacing: 1 },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(135deg, rgba(25, 32, 56, 0.9), rgba(64, 33, 95, 0.9))',
          border: '1px solid rgba(127, 90, 240, 0.2)',
          boxShadow: '0 18px 40px -18px rgba(0, 0, 0, 0.6)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: alpha('#04040a', 0.8),
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(127, 90, 240, 0.25)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 999,
        },
      },
    },
  },
})

export default theme
