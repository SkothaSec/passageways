import { useEffect, useState } from 'react'
import { buildMallSheetUrl, MALL_SHEETS, parseMallResponse } from '../../data/mallTable.js'

function useMallInventory(sheetName) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let abort = false

    const load = async () => {
      setLoading(true)
      setRows([])
      setError('')
      try {
        const sheetConfig = MALL_SHEETS.find((sheet) => sheet.sheet === sheetName || sheet.id === sheetName)

        const response = await fetch(buildMallSheetUrl(sheetConfig || sheetName))
        if (!response.ok) {
          throw new Error(`Failed to load mall data: ${response.status}`)
        }

        const payload = await response.text()
        if (abort) {
          return
        }

        const normalizedRows = parseMallResponse(payload, sheetConfig).map((row, index) => ({
          id: `${row.tier}-${row.name}-${index}`,
          ...row,
        }))

        if (!abort) {
          setRows(normalizedRows)
          setError('')
        }
      } catch (err) {
        if (!abort) {
          console.error(err)
          setError('Unable to load mall inventory right now. Please retry later.')
        }
      } finally {
        if (!abort) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      abort = true
    }
  }, [sheetName])

  return { rows, loading, error }
}

export default useMallInventory
