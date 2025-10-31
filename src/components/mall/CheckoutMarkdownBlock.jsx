import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism'
import materialDark from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark'

function CheckoutMarkdownBlock({ markdown, onCopy, copied }) {
  const hasContent = Boolean(markdown?.trim())

  return (
    <Paper
      elevation={4}
      sx={{
        p: 0,
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid rgba(127, 90, 240, 0.35)',
        background: 'linear-gradient(135deg, rgba(18,20,38,0.9), rgba(27,20,45,0.95))',
        backdropFilter: 'blur(12px)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.5,
          borderBottom: '1px solid rgba(127, 90, 240, 0.35)',
          background: 'linear-gradient(135deg, rgba(28, 22, 48, 0.95), rgba(46, 28, 68, 0.9))',
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Checkout Markdown
        </Typography>
        <Tooltip title={copied ? 'Copied!' : hasContent ? 'Copy to clipboard' : 'Generate checkout first'} placement="left">
          <span>
            <IconButton
              aria-label="Copy checkout markdown"
              onClick={onCopy}
              color="primary"
              size="small"
              disabled={!hasContent}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
      <Box
        sx={{
          maxHeight: 200,
          overflowY: 'auto',
          backgroundColor: '#1e1e1e',
        }}
      >
        {hasContent ? (
          <SyntaxHighlighter
            language="markdown"
            style={materialDark}
            customStyle={{ margin: 0, borderRadius: 0, backgroundColor: '#1e1e1e', padding: '16px' }}
          >
            {markdown}
          </SyntaxHighlighter>
        ) : (
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Run checkout to generate a Discord-ready post.
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  )
}

CheckoutMarkdownBlock.propTypes = {
  markdown: PropTypes.string,
  onCopy: PropTypes.func.isRequired,
  copied: PropTypes.bool,
}

CheckoutMarkdownBlock.defaultProps = {
  markdown: '',
  copied: false,
}

export default CheckoutMarkdownBlock
