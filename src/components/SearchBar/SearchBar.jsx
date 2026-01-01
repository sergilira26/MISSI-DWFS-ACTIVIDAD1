import { useState } from 'react'
import { useDebouncedCallback } from '../../hooks/useDebouncedCallback.js'

// Buscador con debounce para no filtrar en cada tecla.
export default function SearchBar({ value, onChange, placeholder, debounceMs = 300 }) {
  const [draft, setDraft] = useState(value ?? '')
  const { debounced, flush } = useDebouncedCallback(onChange, debounceMs)

  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        value={draft}
        onChange={(e) => {
          const next = e.target.value
          setDraft(next)
          debounced(next)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') flush()
        }}
        placeholder={placeholder}
        aria-label="Buscar por título"
      />
    </div>
  )
}
