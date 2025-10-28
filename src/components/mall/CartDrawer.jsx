import { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CartSummary from './CartSummary.jsx'
import CheckoutMarkdownBlock from './CheckoutMarkdownBlock.jsx'

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
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) {
      return undefined
    }

    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  const markdownCodeBlock = useMemo(() => {
    if (!markdown) {
      return ''
    }

    const content = markdown.endsWith('\n') ? markdown : `${markdown}\n`
    return content
  }, [markdown])

  const handleCopyMarkdown = async () => {
    if (!markdownCodeBlock) {
      return
    }

    try {
      await navigator.clipboard.writeText(markdownCodeBlock)
      setCopied(true)
    } catch (error) {
      console.error('Failed to copy checkout markdown', error)
    }
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: { xs: '100%', sm: 420 }, background: 'linear-gradient(135deg, rgba(18, 20, 38, 0.97), rgba(28, 20, 48, 0.99))' } }}>
      <Box sx={{ p: { xs: 2, sm: 3 }, height: '100%', display: 'grid', gridTemplateRows: 'auto auto 1fr', gap: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Cart
          </Typography>
          <Button variant="text" color="inherit" onClick={onClose}>
            Close
          </Button>
        </Stack>

        <Box sx={{ display: 'grid', gap: 2 }}>
          <Divider sx={{ borderColor: 'rgba(127, 90, 240, 0.2)' }} />
          <Box sx={{ overflowY: 'auto', maxHeight: 260, pr: 1 }}>
            <CartSummary
              items={items}
              grandTotal={grandTotal}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onRemove={onRemove}
            />
          </Box>
          <Stack direction="row" spacing={2}>
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

        <Box sx={{ display: 'grid', gap: 1.5, overflow: 'hidden', minHeight: 0 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Grand Total
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {grandTotal}
            </Typography>
          </Stack>
          <CheckoutMarkdownBlock
            markdown={markdownCodeBlock}
            onCopy={handleCopyMarkdown}
            copied={copied}
          />
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
