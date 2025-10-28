import PropTypes from 'prop-types'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const panelVariants = {
  elevated: {
    p: { xs: 3, md: 4 },
    borderRadius: 4,
    border: '1px solid rgba(127, 90, 240, 0.35)',
    background: 'linear-gradient(135deg, rgba(18,20,38,0.85), rgba(28,20,48,0.92))',
    boxShadow: '0 24px 48px rgba(5, 5, 12, 0.35)',
  },
  minimal: {
    p: { xs: 3, md: 4 },
    borderRadius: 5,
    border: '1px solid rgba(127, 90, 240, 0.2)',
    background: 'rgba(12, 14, 24, 0.6)',
    boxShadow: '0 18px 40px rgba(8, 8, 16, 0.22)',
    backdropFilter: 'blur(18px)',
  },
}

function ContentPanel({ title, subtitle, children, variant, sx }) {
  const variantStyles = panelVariants[variant] || panelVariants.elevated

  return (
    <Paper elevation={6} sx={{ ...variantStyles, ...sx }}>
      <Stack spacing={2.5}>
        {title ? (
          <Stack spacing={0.5}>
            <Typography variant="h4" component="h2">
              {title}
            </Typography>
            {subtitle ? (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            ) : null}
          </Stack>
        ) : null}
        {children}
      </Stack>
    </Paper>
  )
}

ContentPanel.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['elevated', 'minimal']),
  sx: PropTypes.object,
}

ContentPanel.defaultProps = {
  title: undefined,
  subtitle: undefined,
  variant: 'elevated',
  sx: undefined,
}

export default ContentPanel
