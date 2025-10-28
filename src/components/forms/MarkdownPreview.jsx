import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism'
import materialDark from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark'

function MarkdownPreview({ title = 'Markdown Output', content, language = 'markdown', copied, onCopy }) {
  if (!content) {
    return null
  }

  return (
    <Paper
      elevation={6}
      sx={{
        p: 0,
        overflow: 'hidden',
        border: '1px solid rgba(127, 90, 240, 0.35)',
        background: 'linear-gradient(135deg, rgba(18,20,38,0.85), rgba(27,20,45,0.9))',
        backdropFilter: 'blur(16px)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2.5,
          py: 1.75,
          borderBottom: '1px solid rgba(127, 90, 240, 0.35)',
          background: 'linear-gradient(135deg, rgba(28, 22, 48, 0.95), rgba(46, 28, 68, 0.9))',
          color: 'text.primary',
        }}
      >
        <Typography variant="h6" sx={{ mr: 1, fontWeight: 600 }}>
          {title}
        </Typography>
        <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'} placement="left">
          <IconButton aria-label="Copy markdown" onClick={onCopy} size="small" color="primary">
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ backgroundColor: '#1e1e1e' }}>
        <SyntaxHighlighter
          language={language}
          style={materialDark}
          customStyle={{ margin: 0, borderRadius: 0, backgroundColor: '#1e1e1e' }}
        >
          {content}
        </SyntaxHighlighter>
      </Box>
    </Paper>
  )
}

export default MarkdownPreview
