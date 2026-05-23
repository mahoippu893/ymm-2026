import { Outlet } from 'react-router-dom'
import SideMenu from '../components/SideMenu'
import SiteFooter from '../components/SiteFooter'

export default function AppLayout() {
  return (
    <>
      <SideMenu />
      <main className="app-main">
        <Outlet />
        <SiteFooter />
      </main>
    </>
  )
}
