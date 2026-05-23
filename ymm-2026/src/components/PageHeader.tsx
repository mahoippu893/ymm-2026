import { useLocation } from 'react-router-dom'
import { getPageMenuItemByPath } from '../config/pageMenu'

export default function PageHeader() {
  const { pathname } = useLocation()
  const item = getPageMenuItemByPath(pathname)

  if (!item) return null

  return (
    <header className="page-header">
      <p className="page-header__title" role="heading" aria-level={1}>
        {item.label}
      </p>
    </header>
  )
}
