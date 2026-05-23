export type TableBrickPlacement = {
  gridRow: number
  gridColumn: number
  gridColumnEnd?: number
  rowKind: 'pair' | 'single'
}

function getPairColumns(columns: number, pairGroupIndex: number): [number, number] {
  if (columns <= 1) return [1, 1]
  if (columns === 2) return [1, 2]
  if (columns === 3) return [1, 3]

  const patterns: [number, number][] = [
    [1, columns],
    [2, columns - 1],
  ]

  if (columns >= 5) {
    const mid = Math.ceil(columns / 2)
    patterns.push([mid - 1, mid + 1])
  }

  return patterns[pairGroupIndex % patterns.length]
}

function getSingleColumn(columns: number, singleGroupIndex: number): number {
  if (columns <= 1) return 1
  if (columns === 3) return 2

  const innerColumns = Array.from(
    { length: columns - 2 },
    (_, index) => index + 2,
  )
  return innerColumns[singleGroupIndex % innerColumns.length]
}

/**
 * レンガ並び（任意列数）:
 * - 2個の行 → 列ペアを交互に（3列: 1&3、4列: 1&4 → 2&3 …）
 * - 1個の行 → 内側の列を順に（2列のときは全幅中央）
 */
export function getTableBrickPlacements(
  itemCount: number,
  columns: number,
): TableBrickPlacement[] {
  if (itemCount === 0 || columns < 1) return []

  const placements: TableBrickPlacement[] = []
  let row = 1
  let pairRow = true
  let itemIndex = 0
  let pairGroupIndex = 0
  let singleGroupIndex = 0

  while (itemIndex < itemCount) {
    if (pairRow) {
      if (columns === 1) {
        placements.push({ gridRow: row, gridColumn: 1, rowKind: 'pair' })
        itemIndex++
      } else {
        const [leftCol, rightCol] = getPairColumns(columns, pairGroupIndex++)
        placements.push({ gridRow: row, gridColumn: leftCol, rowKind: 'pair' })
        itemIndex++
        if (itemIndex >= itemCount) break

        placements.push({ gridRow: row, gridColumn: rightCol, rowKind: 'pair' })
        itemIndex++
      }
      row++
    } else {
      if (columns === 1) {
        placements.push({ gridRow: row, gridColumn: 1, rowKind: 'single' })
      } else if (columns === 2) {
        placements.push({
          gridRow: row,
          gridColumn: 1,
          gridColumnEnd: 3,
          rowKind: 'single',
        })
      } else {
        placements.push({
          gridRow: row,
          gridColumn: getSingleColumn(columns, singleGroupIndex++),
          rowKind: 'single',
        })
      }
      itemIndex++
      row++
    }
    pairRow = !pairRow
  }

  return placements
}
