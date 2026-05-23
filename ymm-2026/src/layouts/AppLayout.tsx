import { Outlet } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ScrollToTop from '../components/ScrollToTop'
import SideMenu from '../components/SideMenu'
import SiteFooter from '../components/SiteFooter'

export default function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <SideMenu />
      <main className="app-main">
        <PageHeader />
        <Outlet />
        <SiteFooter />
      </main>
    </>
  )
}
