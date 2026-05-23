import { memo, type ReactNode } from 'react'

const TABLE_CELL_ITEM_VARIANTS = {
  heart: {
    imageSrc: '/resources/heart.svg',
    contentClassName: 'px-[8%] pb-[22%] pt-[18%]',
    messageClassName: 'pt-6',
  },
  comment: {
    imageSrc: '/resources/comment.svg',
    contentClassName: 'px-[12%] pb-[18%]',
    messageClassName: 'pt-6',
  },
  spade: {
    imageSrc: '/resources/spade.svg',
    contentClassName: 'px-[10%] pb-[28%] pt-[22%]',
    messageClassName: 'pt-6',
  },
  cloud: {
    imageSrc: '/resources/cloud.svg',
    contentClassName: 'px-[14%] pb-[20%] pt-[26%]',
    messageClassName: 'pt-10',
  },
  crown: {
    imageSrc: '/resources/crown.svg',
    contentClassName: 'px-[3%] pb-[20%] pt-[22%]',
    messageClassName: 'pt-20',
  },
} as const

export type TableCellItemVariant = keyof typeof TABLE_CELL_ITEM_VARIANTS
  
export type TableCellItemProps = {
  variant: TableCellItemVariant
  message: string
  name: string
  nameSuffix?: string
  linkColor?: string
}

const MESSAGE_TAG_PATTERN = /<(a)\s+([^>]+)>(.*?)<\/a>|<(s)>(.*?)<\/s>/gis

function parseMessage(message: string, linkColor: string): ReactNode[] {
  const result: ReactNode[] = []
  let lastIndex = 0

  for (const match of message.matchAll(MESSAGE_TAG_PATTERN)) {
    const [fullMatch, , aAttrs, aContent, , sContent] = match
    const matchIndex = match.index ?? 0

    if (matchIndex > lastIndex) {
      result.push(message.slice(lastIndex, matchIndex))
    }

    if (aAttrs !== undefined && aContent !== undefined) {
      const hrefMatch = aAttrs.match(/href=(?:"([^"]+)"|'([^']+)'|([^\s]+))/i)
      const href =
        hrefMatch?.[1] ?? hrefMatch?.[2] ?? hrefMatch?.[3] ?? undefined

      result.push(
        <a
          key={result.length}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: linkColor, textDecoration: 'underline' }}
        >
          {parseMessage(aContent, linkColor)}
        </a>,
      )
    } else if (sContent !== undefined) {
      result.push(
        <s key={result.length}>{parseMessage(sContent, linkColor)}</s>,
      )
    }

    lastIndex = matchIndex + fullMatch.length
  }

  if (lastIndex < message.length) {
    result.push(message.slice(lastIndex))
  }
  return result
}

export const TableCellItem = memo(function TableCellItem({
  variant,
  message,
  name,
  nameSuffix = ' センパイ',
  linkColor = '#4eb8c8',
}: TableCellItemProps) {
  const { imageSrc, contentClassName, messageClassName } =
    TABLE_CELL_ITEM_VARIANTS[variant]

  return (
    <div className="table-cell-item">
      <img
        src={imageSrc}
        alt=""
        aria-hidden="true"
        className="table-cell-item__image"
        draggable={false}
      />
      <div
        className={`table-cell-item__content ${contentClassName}`}
      >
        <p
          className={`table-cell-item__message whitespace-pre-line break-words text-center font-medium leading-[1.65] tracking-[0.01em] ${messageClassName}`}
        >
          {parseMessage(message, linkColor)}
        </p>
        {name && (
          <p className="table-cell-item__name mt-2 text-center font-medium">
            {name}
            {nameSuffix}
          </p>
        )}
      </div>
    </div>
  )
})
