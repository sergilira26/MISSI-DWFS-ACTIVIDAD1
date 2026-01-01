// Estado vacío reutilizable: lo uso para 404, carrito vacío, búsquedas sin resultados, etc.
export default function EmptyState({ title, description, action }) {
  return (
    <div className="empty-state">
      <h2 className="empty-state__title">{title}</h2>
      {description ? (
        <p className="empty-state__description">{description}</p>
      ) : null}
      {action ? <div className="empty-state__actions">{action}</div> : null}
    </div>
  )
}
