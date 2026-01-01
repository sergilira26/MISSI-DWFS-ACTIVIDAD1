import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState/EmptyState.jsx'

export default function NotFoundPage() {
  return (
    <div className="page">
      <EmptyState
        title="Página no encontrada"
        description="La ruta que has abierto no existe."
        action={
          <Link to="/home" className="btn btn--primary">
            Ir al catálogo
          </Link>
        }
      />
    </div>
  )
}
