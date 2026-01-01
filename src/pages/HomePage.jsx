import { useEffect, useMemo, useRef, useState } from 'react'
import BookCardSkeleton from '../components/BookCard/BookCardSkeleton.jsx'
import BookGrid from '../components/BookGrid/BookGrid.jsx'
import SearchBar from '../components/SearchBar/SearchBar.jsx'
import { BOOKS } from '../data/books.js'

const PAGE_SIZE = 20
const LOAD_MORE_DELAY_MS = 450
const SKELETON_BATCH = 6

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const loadMoreRef = useRef(null)
  const canLoadMoreRef = useRef(true)

  function handleQueryChange(nextQuery) {
    setQuery(nextQuery)
    setVisibleCount(PAGE_SIZE)
    setIsLoadingMore(false)
    canLoadMoreRef.current = true
  }

  const filteredBooks = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return BOOKS
    return BOOKS.filter((b) => b.title.toLowerCase().includes(q))
  }, [query])

  const visibleBooks = useMemo(
    () => filteredBooks.slice(0, visibleCount),
    [filteredBooks, visibleCount],
  )

  const hasMore = visibleCount < filteredBooks.length

  useEffect(() => {
    if (!hasMore) return
    const target = loadMoreRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return

        if (!entry.isIntersecting) {
          canLoadMoreRef.current = true
          return
        }

        if (!canLoadMoreRef.current) return
        canLoadMoreRef.current = false
        setIsLoadingMore(true)
      },
      { rootMargin: '0px' },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [hasMore])

  useEffect(() => {
    if (!isLoadingMore) return

    const timeoutId = window.setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredBooks.length))
      setIsLoadingMore(false)
    }, LOAD_MORE_DELAY_MS)

    return () => window.clearTimeout(timeoutId)
  }, [filteredBooks.length, isLoadingMore])

  const skeletonCount = isLoadingMore
    ? Math.min(SKELETON_BATCH, filteredBooks.length - visibleBooks.length)
    : 0

  const trailing =
    skeletonCount > 0
      ? Array.from({ length: skeletonCount }, (_, i) => (
          <BookCardSkeleton key={`skeleton-${i}`} />
        ))
      : null

  return (
    <div className="page">
      <h1 className="page__title">Catálogo</h1>
      <p className="page__subtitle">
        Busca por título y entra en un libro para ver el detalle.
      </p>

      <SearchBar
        value={query}
        onChange={handleQueryChange}
        placeholder="Buscar por título…"
      />

      <BookGrid books={visibleBooks} trailing={trailing} />

      <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
        <p>
          Mostrando <span className="text-slate-200">{visibleBooks.length}</span> de{' '}
          <span className="text-slate-200">{filteredBooks.length}</span>
        </p>
        <p>
          {hasMore
            ? isLoadingMore
              ? 'Cargando…'
              : 'Deslízate para ver más'
            : 'Fin'}
        </p>
      </div>

      {/* Sentinel del infinite scroll */}
      {hasMore ? <div ref={loadMoreRef} className="h-1" /> : null}
    </div>
  )
}

