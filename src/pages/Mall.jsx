import { useCallback, useEffect, useMemo, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import MallFiltersPanel from '../components/mall/MallFiltersPanel.jsx'
import MallTable from '../components/mall/MallTable.jsx'
import useMallInventory from '../components/mall/useMallInventory.js'
import CartDrawer from '../components/mall/CartDrawer.jsx'
import { MALL_SHEETS, buildMallSheetViewUrl } from '../data/mallTable.js'

function Mall() {
  const [activeSheetId, setActiveSheetId] = useState(MALL_SHEETS[0]?.id ?? '')
  const activeSheet = useMemo(() => {
    if (!MALL_SHEETS.length) {
      return { id: 'default', label: 'Inventory', sheet: 'Sheet1' }
    }
    return MALL_SHEETS.find((sheet) => sheet.id === activeSheetId) ?? MALL_SHEETS[0]
  }, [activeSheetId])

  const { rows, loading, error } = useMallInventory(activeSheet.sheet)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTiers, setSelectedTiers] = useState([])
  const [selectedRarity, setSelectedRarity] = useState([])
  const [attunementFilter, setAttunementFilter] = useState('all')
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutMarkdown, setCheckoutMarkdown] = useState('')

  const tierOptions = useMemo(
    () => Array.from(new Set(rows.map((row) => row.tier || 'Unspecified'))),
    [rows],
  )

  const rarityOptions = useMemo(
    () => Array.from(new Set(rows.map((row) => row.rarity || 'Unspecified'))),
    [rows],
  )

  const columns = useMemo(
    () => [
      { field: 'tier', headerName: 'Tier', width: 100 },
      {
        field: 'name',
        headerName: 'Name',
        flex: 1.4,
        minWidth: 220,
        renderCell: (params) => {
          const value = params.value || '—'
          const url = params.row.url

          if (!url) {
            return value
          }

          return (
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="secondary"
              sx={{
                fontWeight: 600,
                color: 'secondary.light',
                '&:hover': { color: 'secondary.main' },
                '&:visited': { color: 'secondary.light' },
              }}
            >
              {value}
            </Link>
          )
        },
      },
      { field: 'source', headerName: 'Source', minWidth: 150, flex: 1 },
      { field: 'rarity', headerName: 'Rarity', minWidth: 140, flex: 0.8 },
      { field: 'type', headerName: 'Type', minWidth: 180, flex: 1 },
      { field: 'attunement', headerName: 'Attunement', minWidth: 150, flex: 0.6 },
      {
        field: 'value',
        headerName: 'Value (gp)',
        minWidth: 140,
        flex: 0.7,
        renderCell: ({ row }) => row.value || '—',
      },
      {
        field: 'note',
        headerName: 'Notes',
        minWidth: 220,
        flex: 1.2,
        renderCell: ({ row }) => row.note || '—',
      },
    ],
    [],
  )

  const parseGoldValue = useCallback((rawValue) => {
    if (rawValue == null) {
      return 0
    }

    let str = String(rawValue).trim()
    if (!str || str === '—') {
      return 0
    }

    let multiplier = 1
    const suffix = str.slice(-1).toLowerCase()
    if (suffix === 'k') {
      multiplier = 1000
      str = str.slice(0, -1)
    } else if (suffix === 'm') {
      multiplier = 1_000_000
      str = str.slice(0, -1)
    }

    const numeric = parseFloat(str.replace(/[^0-9.]/g, ''))
    if (!Number.isFinite(numeric)) {
      return 0
    }

    return numeric * multiplier
  }, [])

  const formatGoldValue = useCallback((amount) => {
    return `${new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(amount)} gp`
  }, [])

  const handleAddToCart = useCallback(
    (row) => {
      const unitValue = parseGoldValue(row.value)
      const displayValue = row.value && row.value !== '—' ? row.value : formatGoldValue(unitValue)

      setCartItems((prev) => {
        const existing = prev.find((item) => item.id === row.id)
        if (existing) {
          return prev.map((item) =>
            item.id === row.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        }

        return [
          ...prev,
          {
            id: row.id,
            name: row.name,
            quantity: 1,
            unitValue,
            displayValue,
          },
        ]
      })
      setCheckoutMarkdown('')
    },
    [parseGoldValue, formatGoldValue],
  )

  const handleClearCart = useCallback(() => {
    setCartItems([])
    setCheckoutMarkdown('')
  }, [])

  const handleIncrementItem = useCallback((id) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    )
    setCheckoutMarkdown('')
  }, [])

  const handleDecrementItem = useCallback((id) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    )
    setCheckoutMarkdown('')
  }, [])

  const handleRemoveItem = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
    setCheckoutMarkdown('')
  }, [])

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  )

  const cartDisplayItems = useMemo(
    () =>
      cartItems.map((item) => {
        const subtotal = item.unitValue * item.quantity
        const formattedValue = item.displayValue || formatGoldValue(item.unitValue)
        const formattedSubtotal = formatGoldValue(subtotal)

        return {
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          formattedValue,
          formattedSubtotal,
        }
      }),
    [cartItems, formatGoldValue],
  )

  const grandTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.unitValue * item.quantity, 0),
    [cartItems],
  )

  const grandTotalFormatted = useMemo(() => formatGoldValue(grandTotal), [grandTotal, formatGoldValue])

  const handleCheckout = useCallback(() => {
    if (!cartItems.length) {
      setCheckoutMarkdown('')
      return
    }

    const lines = cartItems.map(
      (item) => `- ${item.name} (${item.quantity}) - ${formatGoldValue(item.unitValue * item.quantity)}`,
    )
    const markdown = `${lines.join('\n')}\n\nTotal: ${formatGoldValue(grandTotal)}`
    setCheckoutMarkdown(markdown)
  }, [cartItems, grandTotal, formatGoldValue])

  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    const tierSet = selectedTiers.length ? new Set(selectedTiers) : null
    const raritySet = selectedRarity.length ? new Set(selectedRarity) : null

    return rows.filter((row) => {
      const tier = row.tier || 'Unspecified'
      const rarity = row.rarity || 'Unspecified'

      if (tierSet && !tierSet.has(tier)) {
        return false
      }

      if (raritySet && !raritySet.has(rarity)) {
        return false
      }

      if (attunementFilter !== 'all') {
        const requiresAttunement = row.attunement?.toLowerCase().includes('required')
        if (attunementFilter === 'required' && !requiresAttunement) {
          return false
        }
        if (attunementFilter === 'not_required' && requiresAttunement) {
          return false
        }
      }

      if (!query) {
        return true
      }

      const haystack = [row.name, rarity, row.type, row.note].join(' ').toLowerCase()
      return haystack.includes(query)
    })
  }, [rows, searchQuery, selectedTiers, selectedRarity, attunementFilter])

  useEffect(() => {
    if (!loading && tierOptions.length && !selectedTiers.length) {
      setSelectedTiers(tierOptions)
    }
  }, [loading, tierOptions, selectedTiers.length])

  useEffect(() => {
    if (!loading && rarityOptions.length && !selectedRarity.length) {
      setSelectedRarity(rarityOptions)
    }
  }, [loading, rarityOptions, selectedRarity.length])

  useEffect(() => {
    setSearchQuery('')
    setSelectedTiers([])
    setSelectedRarity([])
    setAttunementFilter('all')
  }, [activeSheetId])

  return (
    <Container maxWidth="lg" sx={{ py: 6, display: 'grid', gap: 3 }}>
      <Box sx={{ display: 'grid', gap: { xs: 2, md: 2.5 } }}>
        <Typography variant="h4" component="h1">
          Passageways Mall Inventory
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'stretch', md: 'center' },
            gap: { xs: 1.5, md: 2 },
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
            Browse the curated inventory pulled directly from the Passageways mall sheet. Use the filters to hone in on the exact gear you need.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setCartOpen(true)}
            sx={{
              alignSelf: { xs: 'stretch', md: 'center' },
              minWidth: { md: 160 },
              fontWeight: 600,
              whiteSpace: 'nowrap',
              boxShadow: '0 8px 24px rgba(127, 90, 240, 0.35)',
            }}
          >
            View Cart ({totalItems})
          </Button>
        </Box>
        <Typography variant="caption" color="text.secondary">
          Data source: <Link href={buildMallSheetViewUrl(activeSheet)} target="_blank" rel="noopener noreferrer">Passageways Mall Google Sheet</Link>
        </Typography>
      </Box>

      <MallFiltersPanel
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sheetOptions={MALL_SHEETS}
        selectedSheetId={activeSheetId}
        onSheetChange={setActiveSheetId}
        tierOptions={tierOptions}
        selectedTiers={selectedTiers}
        onTiersChange={setSelectedTiers}
        rarityOptions={rarityOptions}
        selectedRarity={selectedRarity}
        onRarityChange={setSelectedRarity}
        attunementFilter={attunementFilter}
        onAttunementChange={setAttunementFilter}
      />

      {loading ? (
        <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 320 }}>
          <CircularProgress color="inherit" />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Mall inventory is loading...
          </Typography>
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <MallTable rows={filteredRows} columns={columns} loading={loading} onAddToCart={handleAddToCart} />
        </>
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartDisplayItems}
        grandTotal={grandTotalFormatted}
        onClear={handleClearCart}
        onIncrement={handleIncrementItem}
        onDecrement={handleDecrementItem}
        onRemove={handleRemoveItem}
        markdown={checkoutMarkdown}
        onCheckout={handleCheckout}
        checkoutDisabled={!cartItems.length}
      />
    </Container>
  )
}

export default Mall
