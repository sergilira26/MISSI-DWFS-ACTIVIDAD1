import { createContext } from 'react'

// Contexto del carrito separado para que Fast Refresh no se queje.
export const CartContext = createContext(null)
