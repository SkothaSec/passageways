import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import DungeonMaster from './pages/DungeonMaster.jsx'
import UserTools from './pages/UserTools.jsx'
import Mall from './pages/Mall.jsx'

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dm" element={<DungeonMaster />} />
          <Route path="/user" element={<UserTools />} />
          <Route path="/mall" element={<Mall />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App
