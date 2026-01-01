# Relatos de Papel

Front-end (sin back-end) para una librería online con:

- React (componentes funcionales)
- React Router v6 (rutas)
- Tailwind CSS v4 + metodología BEM (clases semánticas con `@apply`)
- Datos mock (catálogo en `src/data/books.js`)
- Carrito persistido en `localStorage`

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`

## Rutas

- `/` landing con redirección automática a los 5s
- `/home` catálogo + buscador (filtra por título)
- `/book/:bookId` detalle + añadir al carrito
- `/checkout` resumen + pago simulado

## Componentes (resumen)

- `src/App.jsx` router + providers
- `src/components/Layout/Layout.jsx` shell (header + outlet + footer + drawer)
- `src/components/Header/Header.jsx`
- `src/components/Footer/Footer.jsx`
- `src/components/SearchBar/SearchBar.jsx`
- `src/components/BookGrid/BookGrid.jsx`
- `src/components/BookCard/BookCard.jsx`
- `src/components/CartDrawer/CartDrawer.jsx`
- `src/components/CartItem/CartItem.jsx`
- `src/components/EmptyState/EmptyState.jsx`

## Hooks

- `useState`, `useEffect` (varios componentes)
- Custom hooks: `src/hooks/useLocalStorageState.js`, `src/hooks/useCart.js`, `src/hooks/useDebouncedCallback.js`

## Despliegue (Vercel)

Incluye `vercel.json` para que React Router funcione al refrescar (rewrite a `index.html`).
