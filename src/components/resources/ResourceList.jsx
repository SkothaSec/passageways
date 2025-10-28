import PropTypes from 'prop-types'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

function ResourceList({ items }) {
  return (
    <List disablePadding>
      {items.map((item, index) => (
        <ListItem
          key={item.title}
          component={Link}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            alignItems: 'flex-start',
            display: 'block',
            px: { xs: 2.5, md: 3 },
            py: { xs: 2, md: 2.25 },
            borderBottom:
              index === items.length - 1 ? 'none' : '1px solid rgba(127, 90, 240, 0.2)',
            transition: 'background-color 200ms ease, transform 200ms ease',
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
              backgroundColor: 'rgba(127, 90, 240, 0.12)',
              transform: 'translateY(-2px)',
            },
            '&:visited': {
              color: 'inherit',
            },
          }}
        >
          <ListItemText
            primary={
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {item.title}
              </Typography>
            }
            secondary={
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  )
}

ResourceList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default ResourceList
