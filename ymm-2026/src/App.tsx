import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/AppLayout'
import Page1 from './pages/Page1'
import Page2 from './pages/page2'
import Page3 from './pages/Page3'
import Page4 from './pages/Page4'
import Page5 from './pages/Page5'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/page/1" replace />} />
          <Route path="/page/1" element={<Page1 />} />
          <Route path="/page/2" element={<Page2 />} />
          <Route path="/page/3" element={<Page3 />} />
          <Route path="/page/4" element={<Page4 />} />
          <Route path="/page/5" element={<Page5 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
