import { useMemo } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { DataGrid } from '@mui/x-data-grid'
function MallTable({ rows, columns, loading, onAddToCart }) {
  const augmentedColumns = useMemo(() => {
    if (!onAddToCart) {
      return columns
    }

    const hasActions = columns.some((column) => column.field === '__actions')
    if (hasActions) {
      return columns
    }

    return [
      {
        field: '__actions',
        headerName: '',
        sortable: false,
        filterable: false,
        width: 80,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
          <IconButton
            aria-label={`Add ${params.row.name} to cart`}
            color="primary"
            size="small"
            onClick={(event) => {
              event.stopPropagation()
              onAddToCart(params.row)
            }}
          >
            <AddCircleOutlineIcon fontSize="small" />
          </IconButton>
        ),
      },
      ...columns,
    ]
  }, [columns, onAddToCart])

  return (
    <Paper
      elevation={4}
      sx={{
        height: 600,
        width: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid rgba(127, 90, 240, 0.25)',
        background: 'linear-gradient(135deg, rgba(18, 20, 38, 0.7), rgba(28, 20, 48, 0.85))',
        backdropFilter: 'blur(10px)',
      }}
    >
      <DataGrid
        rows={rows}
        columns={augmentedColumns}
        disableColumnMenu
        loading={loading}
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid rgba(127, 90, 240, 0.15)',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'rgba(31, 24, 58, 0.85)',
            borderBottom: '1px solid rgba(127, 90, 240, 0.35)',
            fontWeight: 600,
            letterSpacing: '0.05em',
          },
        }}
      />
    </Paper>
  )
}

export default MallTable

MallTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  onAddToCart: PropTypes.func,
}

MallTable.defaultProps = {
  loading: false,
  onAddToCart: undefined,
}
