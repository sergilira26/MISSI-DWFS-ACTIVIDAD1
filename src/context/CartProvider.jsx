import { useLocalStorageState } from '../hooks/useLocalStorageState.js'
import { CartContext } from './CartContext.js'

const STORAGE_KEY = 'rdp_cart_v1'

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorageState(STORAGE_KEY, [])

  function addToCart(book, quantity = 1) {
    const qtyToAdd = Math.min(99, Math.max(1, Math.floor(Number(quantity) || 1)))

    setItems((prevItems) => {
      const existing = prevItems.find((it) => it.id === book.id)
      if (!existing) return [...prevItems, { ...book, qty: qtyToAdd }]

      return prevItems.map((it) =>
        it.id === book.id ? { ...it, qty: it.qty + qtyToAdd } : it,
      )
    })
  }

  function decrementItem(bookId) {
    setItems((prevItems) => {
      const current = prevItems.find((it) => it.id === bookId)
      if (!current) return prevItems
      if (current.qty <= 1) return prevItems.filter((it) => it.id !== bookId)

      return prevItems.map((it) =>
        it.id === bookId ? { ...it, qty: it.qty - 1 } : it,
      )
    })
  }

  function removeFromCart(bookId) {
    setItems((prevItems) => prevItems.filter((it) => it.id !== bookId))
  }

  function clearCart() {
    setItems([])
  }

  const totalItems = items.reduce((sum, it) => sum + (it.qty ?? 0), 0)
  const totalPrice = items.reduce((sum, it) => sum + it.price * (it.qty ?? 0), 0)

  const value = {
    items,
    addToCart,
    decrementItem,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
