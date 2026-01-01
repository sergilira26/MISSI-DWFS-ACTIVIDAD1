import BookCard from '../BookCard/BookCard.jsx'
import EmptyState from '../EmptyState/EmptyState.jsx'

// Grid de libros. Si no hay resultados, mostramos un estado vacío.
export default function BookGrid({ books, trailing = null }) {
  if (books.length === 0) {
    return (
      <div className="mt-8">
        <EmptyState title="No hay resultados" description="Prueba con otro título." />
      </div>
    )
  }

  return (
    <div className="book-grid" role="list">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
      {trailing}
    </div>
  )
}

