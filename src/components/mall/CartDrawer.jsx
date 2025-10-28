import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CartSummary from './CartSummary.jsx'

function CartDrawer({
  open,
  onClose,
  items,
  grandTotal,
  onClear,
  onIncrement,
  onDecrement,
  onRemove,
  markdown,
  onCheckout,
  checkoutDisabled,
}) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: { xs: '100%', sm: 420 }, background: 'linear-gradient(135deg, rgba(18, 20, 38, 0.97), rgba(28, 20, 48, 0.99))' } }}>
      <Box sx={{ p: { xs: 2, sm: 3 }, display: 'grid', gap: 2, height: '100%' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Cart
          </Typography>
          <Button variant="text" color="inherit" onClick={onClose}>
            Close
          </Button>
        </Stack>

        <Divider sx={{ borderColor: 'rgba(127, 90, 240, 0.2)' }} />

        <CartSummary
          items={items}
          grandTotal={grandTotal}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onRemove={onRemove}
        />

        <Box sx={{ display: 'grid', gap: 2, mt: 'auto', pt: 2 }}>
          {markdown && (
            <TextField
              label="Checkout Markdown"
              value={markdown}
              multiline
              minRows={6}
              InputProps={{ readOnly: true }}
            />
          )}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Grand Total
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {grandTotal}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              color="inherit"
              fullWidth
              disabled={!items.length}
              onClick={onClear}
            >
              Clear Cart
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={!items.length || checkoutDisabled}
              onClick={onCheckout}
            >
              Checkout
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  )
}

CartDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  grandTotal: PropTypes.string.isRequired,
  onClear: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  markdown: PropTypes.string,
  onCheckout: PropTypes.func.isRequired,
  checkoutDisabled: PropTypes.bool,
}

CartDrawer.defaultProps = {
  markdown: '',
  checkoutDisabled: false,
}

export default CartDrawer
