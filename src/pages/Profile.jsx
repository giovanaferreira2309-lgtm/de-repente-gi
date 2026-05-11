import { useParams, Link } from 'react-router-dom'
import { CURRENT_USER, PARTICIPANTS, FEED_POSTS, CHALLENGE_TASKS } from '../data/mockData'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'

function findUser(id) {
  if (id === 'user-giovana') return CURRENT_USER
  const p = PARTICIPANTS.find(p => p.id === id)
  if (!p) return null
  return {
    ...p,
    bio: 'Participante do desafio Do Zero ao Viver de Internet 💜',
    joinedAt: '2024-01-15',
    location: 'Brasil',
  }
}

function DayBadge({ day, completed }) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-xl p-2 transition-all ${
      completed
        ? 'bg-lilac-100 border-2 border-lilac-300'
        : 'bg-gray-50 border-2 border-dashed border-gray-200 opacity-40'
    }`}>
      <span className="text-base">{CHALLENGE_TASKS[day - 1]?.emoji}</span>
      <span className="text-xs font-bold text-gray-700 mt-0.5">{day}</span>
    </div>
  )
}

export default function Profile() {
  const { userId } = useParams()
  const user = findUser(userId)
  const isOwnProfile = userId === 'user-giovana'

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Participante não encontrada</h2>
          <Link to="/comunidade" className="text-lilac-600 hover:underline text-sm">← Voltar para a comunidade</Link>
        </div>
      </div>
    )
  }

  const userPosts = FEED_POSTS.filter(p => p.userId === userId || (isOwnProfile && p.userId === 'user-giovana'))
  const completed = user.completedDays?.length || 0
  const streak = user.streak || 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back */}
        <Link to="/comunidade" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-lilac-600 transition-colors mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para a comunidade
        </Link>

        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          {/* Cover */}
          <div className="h-24 gradient-bg relative">
            {isOwnProfile && (
              <Badge variant="coral" className="absolute top-3 right-3">Você</Badge>
            )}
          </div>

          <div className="px-6 pb-6">
            <div className="flex items-end gap-4 -mt-8 mb-4">
              <div className="ring-4 ring-white rounded-full">
                <Avatar src={user.avatar} name={user.name} size="xl" />
              </div>
              <div className="pb-1">
                <h1 className="text-xl font-extrabold text-gray-900">{user.name}</h1>
                <p className="text-sm text-lilac-500 font-medium">{user.username}</p>
              </div>
            </div>

            {user.bio && (
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{user.bio}</p>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              {user.location && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {user.location}
                </span>
              )}
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                No desafio desde {new Date(user.joinedAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Dias concluídos', value: completed, icon: '✅' },
            { label: 'Streak atual', value: streak, icon: '🔥' },
            { label: 'Posts no feed', value: userPosts.length, icon: '📝' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center card-hover">
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-2xl font-extrabold gradient-text">{value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Progress grid */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
          <h2 className="font-bold text-gray-900 mb-1">Progresso no desafio</h2>
          <p className="text-sm text-gray-400 mb-4">
            {completed} de 21 dias — {Math.round((completed / 21) * 100)}% concluído
          </p>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
            <div className="h-full gradient-bg rounded-full transition-all duration-700" style={{ width: `${(completed / 21) * 100}%` }} />
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 21 }, (_, i) => i + 1).map(day => (
              <DayBadge key={day} day={day} completed={user.completedDays?.includes(day)} />
            ))}
          </div>
        </div>

        {/* Posts */}
        <div>
          <h2 className="font-bold text-gray-900 mb-4">
            Posts no feed {userPosts.length > 0 && <span className="text-gray-400 font-normal text-sm ml-1">({userPosts.length})</span>}
          </h2>

          {userPosts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-gray-500 text-sm">Nenhum post ainda. Em breve!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userPosts.map(post => (
                <article key={post.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  {post.image && (
                    <img src={post.image} alt="" className="w-full h-48 object-cover" />
                  )}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="lilac">Dia {post.day} — {post.dayTitle}</Badge>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">{post.text}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>🔥 {post.reactions.fire}</span>
                      <span>✨ {post.reactions.sparkles}</span>
                      <span>💪 {post.reactions.muscle}</span>
                      <span className="ml-auto">
                        {new Date(post.timestamp).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
