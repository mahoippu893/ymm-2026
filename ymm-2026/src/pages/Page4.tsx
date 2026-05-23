import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import BackGroundImage from '../components/BackGroundImage'
import { TableCellItem } from '../components/tableCell/TableCellItem'
import { useTableGridColumns } from '../hooks/useTableGridColumns'
import { getTableBrickPlacements } from '../utils/tableGridLayout'
import {
  parsePageCsv,
  shuffleItems,
  type PageDataItem,
} from '../utils/parsePageCsv'

export default function Page4() {
  const [items, setItems] = useState<PageDataItem[]>([])
  const { gridRef, columns } = useTableGridColumns()

  const placements = useMemo(
    () => getTableBrickPlacements(items.length, columns),
    [items.length, columns],
  )

  const gridStyle = {
    '--table-grid-cols': columns,
  } as CSSProperties

  useEffect(() => {
    fetch('/data/page4_data.csv')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load page4 data: ${res.status}`)
        return res.text()
      })
      .then((text) => setItems(shuffleItems(parsePageCsv(text))))
      .catch(console.error)
  }, [])

  return (
    <div className="page-shell">
      <BackGroundImage src="/resources/background_4.png" />
      <div ref={gridRef} className="table-grid table-grid--page4" style={gridStyle}>
        {items.map((item, index) => {
          const placement = placements[index]
          if (!placement) return null

          return (
            <div
              key={`${item.name}-${index}`}
              className={`table-grid-cell table-grid-cell--${placement.rowKind}${
                placement.gridRow > 1 ? ' table-grid-cell--overlap' : ''
              }`}
              style={{
                gridRow: placement.gridRow,
                gridColumn: placement.gridColumnEnd
                  ? `${placement.gridColumn} / ${placement.gridColumnEnd}`
                  : placement.gridColumn,
              }}
            >
              <TableCellItem variant="cloud" name={item.name} message={item.message} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
