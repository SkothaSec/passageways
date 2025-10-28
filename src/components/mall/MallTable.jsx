import Paper from '@mui/material/Paper'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

function MallTable({ rows, columns, loading }) {
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
        columns={columns}
        disableColumnMenu
        checkboxSelection
        loading={loading}
        components={{ Toolbar: GridToolbar }}
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
