import { useEffect, useState } from 'react'

// Estado sincronizado con localStorage. Lo uso para que el carrito sobreviva a un refresh.
export function useLocalStorageState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch {
      // Si el navegador bloquea storage o está lleno, seguimos sin persistencia.
    }
  }, [key, state])

  return [state, setState]
}
