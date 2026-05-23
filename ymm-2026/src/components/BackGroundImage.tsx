import type { CSSProperties } from 'react'

export type BackGroundImageAlign = 'top-left' | 'top-center'

/** index.css の @media (max-width) と揃える */
export const BACKGROUND_MOBILE_MAX_WIDTH = 768

type BackGroundImageProps = {
  src: string
  /**
   * スマホ用 PNG。未指定時は src から自動推測
   * 例: /resources/background_1.png → /resources/background_1_sp.png
   */
  mobileSrc?: string
  /** @default 'top-left' */
  align?: BackGroundImageAlign
  /** 未指定時は align と同じ */
  mobileAlign?: BackGroundImageAlign
}

const BACKGROUND_POSITION: Record<BackGroundImageAlign, string> = {
  'top-left': 'top left',
  'top-center': 'top center',
}

/** background_1.png → background_1_sp.png */
export function defaultMobileBackgroundSrc(src: string): string {
  return src.replace(/(\.\w+)$/, '_sp$1')
}

export default function BackGroundImage({
  src,
  mobileSrc,
  align = 'top-left',
  mobileAlign,
}: BackGroundImageProps) {
  const mobile = mobileSrc ?? defaultMobileBackgroundSrc(src)
  const mobilePosition = BACKGROUND_POSITION[mobileAlign ?? align]

  const style = {
    '--background-image-url': `url("${src}")`,
    '--background-image-url-mobile': `url("${mobile}")`,
    '--background-position': BACKGROUND_POSITION[align],
    '--background-position-mobile': mobilePosition,
  } as CSSProperties

  return (
    <div
      className="background-image"
      style={style}
      aria-hidden="true"
    />
  )
}
