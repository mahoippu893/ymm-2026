import { useLocation } from 'react-router-dom'
import { getPageMenuItemByPath } from '../config/pageMenu'

export default function PageHeader() {
  const { pathname } = useLocation()
  const item = getPageMenuItemByPath(pathname)

  if (!item) return null

  return (
    <header className="page-header">
      <h1 className="page-header__title">{item.label}</h1>
    </header>
  )
}
