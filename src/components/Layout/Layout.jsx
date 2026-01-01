import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import CartDrawer from '../CartDrawer/CartDrawer.jsx'
import Footer from '../Footer/Footer.jsx'
import Header from '../Header/Header.jsx'

export default function Layout() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <div className="layout">
      <header className="layout__header">
        <div className="layout__container">
          <Header showCart={!isLanding} onOpenCart={() => setIsCartOpen(true)} />
        </div>
      </header>

      <main className="layout__main">
        <Outlet />
      </main>

      <Footer />

      {!isLanding ? (
        <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      ) : null}
    </div>
  )
}
