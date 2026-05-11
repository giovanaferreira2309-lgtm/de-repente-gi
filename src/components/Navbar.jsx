import { Link, useLocation } from 'react-router-dom'
import { CURRENT_USER } from '../data/mockData'

export default function Navbar() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  if (isHome) return null

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-lilac-100 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold gradient-text">DZVI</span>
          <span className="hidden sm:block text-sm text-gray-500 font-medium">Do Zero ao Viver de Internet</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-6">
          <Link
            to="/comunidade"
            className={`text-sm font-medium px-3 py-1.5 rounded-full transition-all ${
              location.pathname === '/comunidade'
                ? 'bg-lilac-300 text-lilac-800'
                : 'text-gray-600 hover:text-lilac-600'
            }`}
          >
            Comunidade
          </Link>
          <Link to="/perfil/user-giovana" className="flex items-center gap-2 group">
            <img
              src={CURRENT_USER.avatar}
              alt={CURRENT_USER.name}
              className="w-8 h-8 rounded-full ring-2 ring-lilac-300 group-hover:ring-coral-400 transition-all"
            />
            <span className="hidden sm:block text-sm font-medium text-gray-700 group-hover:text-lilac-600">
              {CURRENT_USER.name}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
