import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

function ResourceList({ items }) {
  return (
    <Box
      className="resource-grid"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 2,
        alignItems: 'start',
      }}
    >
      {items.map((item) => (
        <Box
          key={item.title}
          component="a"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={0}
          sx={{
            display: 'block',
            textDecoration: 'none',
            color: 'inherit',
            borderRadius: 2,
            p: 2,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(127, 90, 240, 0.06)',
            transition: 'transform 180ms ease, box-shadow 180ms ease',
            '&:hover, &:focus': {
              transform: 'translateY(-6px)',
              boxShadow: '0 8px 30px rgba(11,10,30,0.45)',
            },
          }}
        >
          {/* thumbnail / avatar */}
          {item.thumbnail ? (
            <Box
              component="img"
              src={item.thumbnail}
              alt={item.title}
              loading="lazy"
              sx={{
                width: '100%',
                height: 140,
                objectFit: 'cover',
                borderRadius: 1.5,
                mb: 1.25,
              }}
            />
          ) : null}

          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
            {item.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {item.description}
          </Typography>

          {item.tags?.length ? (
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              {item.tags.slice(0, 3).map((t) => (
                <Chip
                  key={t}
                  label={t}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(127,90,240,0.12)',
                    color: 'text.primary',
                    fontWeight: 600,
                    borderRadius: 99,
                  }}
                />
              ))}
            </Stack>
          ) : null}
        </Box>
      ))}
    </Box>
  )
}

ResourceList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      thumbnail: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
}

export default ResourceList
