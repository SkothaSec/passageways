import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'

function CartSummary({ items, grandTotal, padding = 0, onIncrement, onDecrement, onRemove }) {
  const hasItems = items.length > 0

  return (
    <Box sx={{ p: padding, display: 'grid', gap: 2 }}>
      {hasItems ? (
        <Stack spacing={2}>
          {items.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: 'grid',
                gap: 1,
                gridTemplateColumns: '1fr auto',
                alignItems: 'center',
                p: 1.5,
                borderRadius: 2,
                border: '1px solid rgba(127, 90, 240, 0.25)',
                background: 'linear-gradient(135deg, rgba(28, 22, 48, 0.9), rgba(18, 20, 38, 0.8))',
              }}
            >
              <Box sx={{ display: 'grid', gap: 0.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {item.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.formattedValue} each — Subtotal {item.formattedSubtotal}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => onDecrement(item.id)}
                  disabled={item.quantity <= 1}
                  sx={{ color: 'rgba(255,255,255,0.8)' }}
                >
                  <RemoveIcon fontSize="inherit" />
                </IconButton>
                <Typography variant="body2" sx={{ minWidth: 24, textAlign: 'center' }}>
                  {item.quantity}
                </Typography>
                <IconButton size="small" onClick={() => onIncrement(item.id)} sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  <AddIcon fontSize="inherit" />
                </IconButton>
                <IconButton size="small" onClick={() => onRemove(item.id)} sx={{ color: 'rgba(255,80,80,0.9)' }}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Stack>
      ) : (
        <Box sx={{ py: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Add items from the mall to build your cart.
          </Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, alignItems: 'center', opacity: 0.75 }}>
        <Typography variant="caption">Grand Total:</Typography>
        <Typography variant="caption">{grandTotal}</Typography>
      </Box>
    </Box>
  )
}

CartSummary.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      formattedValue: PropTypes.string.isRequired,
      formattedSubtotal: PropTypes.string.isRequired,
    }),
  ).isRequired,
  grandTotal: PropTypes.string.isRequired,
  padding: PropTypes.number,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default CartSummary
