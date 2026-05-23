import { useEffect, useRef, useState } from 'react'

/** index.css の --table-cell-item-width と揃える */
const CELL_MAX_WIDTH = 420
const GRID_GAP_PX = 24

export function useTableGridColumns() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(2)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const update = () => {
      const width = grid.clientWidth
      const cols = Math.max(
        1,
        Math.floor((width + GRID_GAP_PX) / (CELL_MAX_WIDTH + GRID_GAP_PX)),
      )
      setColumns(cols)
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(grid)
    return () => observer.disconnect()
  }, [])

  return { gridRef, columns }
}
