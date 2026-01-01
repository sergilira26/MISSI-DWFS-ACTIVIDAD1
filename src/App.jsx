import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import { CartProvider } from './context/CartProvider.jsx'
import BookPage from './pages/BookPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import HomePage from './pages/HomePage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

// Punto de entrada de la app: router + providers.
export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/book/:bookId" element={<BookPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/catalog" element={<Navigate to="/home" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}
