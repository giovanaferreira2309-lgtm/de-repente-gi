import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { CURRENT_USER, NOTIFICATIONS } from '../data/mockData'

function timeAgo(ts) {
  const diff = Date.now() - new Date(ts).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 1) return 'agora'
  if (h < 24) return `${h}h`
  return `${Math.floor(h / 24)}d`
}

const typeIcon = { reaction: '🔥', comment: '💬', streak: '🔥', community: '👋', achievement: '🏆' }

function NotificationsDropdown({ onClose }) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS)

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-slide-up">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <span className="font-bold text-gray-900 text-sm">Notificações</span>
        <button onClick={markAllRead} className="text-xs text-lilac-600 hover:text-lilac-700 font-medium transition-colors">
          Marcar todas como lidas
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="py-10 text-center text-gray-400 text-sm">Nenhuma notificação</div>
        ) : (
          notifications.map(n => (
            <div
              key={n.id}
              className={`flex items-start gap-3 px-4 py-3 border-b border-gray-50 last:border-0 transition-colors ${
                !n.read ? 'bg-lilac-50/60' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex-shrink-0 relative">
                {n.avatar ? (
                  <img src={n.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-base">
                    {typeIcon[n.type]}
                  </div>
                )}
                {!n.read && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-coral-400 rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-700 leading-snug">{n.text}</p>
                <span className="text-xs text-gray-400 mt-0.5">{timeAgo(n.timestamp)}</span>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="px-4 py-2 border-t border-gray-100 text-center">
        <button onClick={onClose} className="text-xs text-lilac-600 hover:text-lilac-700 font-medium">
          Fechar
        </button>
      </div>
    </div>
  )
}

export default function Navbar() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [notifOpen, setNotifOpen] = useState(false)
  const unread = NOTIFICATIONS.filter(n => !n.read).length

  if (isHome) return null

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-lilac-100 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold gradient-text">DZVI</span>
          <span className="hidden sm:block text-sm text-gray-500 font-medium">Do Zero ao Viver de Internet</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/comunidade"
            className={`text-sm font-medium px-3 py-1.5 rounded-full transition-all ${
              location.pathname === '/comunidade'
                ? 'bg-lilac-100 text-lilac-700'
                : 'text-gray-600 hover:text-lilac-600'
            }`}
          >
            Comunidade
          </Link>
          <Link
            to="/ranking"
            className={`text-sm font-medium px-3 py-1.5 rounded-full transition-all ${
              location.pathname === '/ranking'
                ? 'bg-lilac-100 text-lilac-700'
                : 'text-gray-600 hover:text-lilac-600'
            }`}
          >
            🏆 <span className="hidden sm:inline">Ranking</span>
          </Link>

          {/* Notifications bell */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(v => !v)}
              className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unread > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-coral-400 rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                  {unread}
                </span>
              )}
            </button>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <div className="relative z-50">
                  <NotificationsDropdown onClose={() => setNotifOpen(false)} />
                </div>
              </>
            )}
          </div>

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
