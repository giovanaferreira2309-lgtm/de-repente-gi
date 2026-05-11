import { Link } from 'react-router-dom'
import { RANKING, CURRENT_USER, ACHIEVEMENTS } from '../data/mockData'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'

function getMedal(rank) {
  if (rank === 1) return { emoji: '👑', bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-700' }
  if (rank === 2) return { emoji: '🥈', bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-600' }
  if (rank === 3) return { emoji: '🥉', bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-600' }
  return null
}

function TopThreeCard({ entry }) {
  const medal = getMedal(entry.rank)
  const isMe = entry.id === 'user-giovana'
  const userAchievements = ACHIEVEMENTS.filter(a => a.condition(entry.completedDays || []))

  return (
    <div className={`relative bg-white rounded-2xl border-2 shadow-sm p-5 flex flex-col items-center text-center card-hover ${
      isMe ? 'border-lilac-400 shadow-lilac-100' : medal ? medal.border : 'border-gray-100'
    }`}>
      {isMe && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="lilac">Você</Badge>
        </div>
      )}
      <div className="text-3xl mb-2">{medal?.emoji}</div>
      <div className="ring-4 ring-white rounded-full mb-3">
        <Avatar src={entry.avatar} name={entry.name} size="lg" />
      </div>
      <h3 className="font-bold text-gray-900 text-sm">{entry.name}</h3>
      <p className="text-xs text-lilac-500 mb-2">{entry.username}</p>
      <div className="flex items-center gap-1 text-coral-500 font-bold text-sm mb-3">
        🔥 {entry.streak} dias
      </div>
      <div className="flex flex-wrap justify-center gap-1">
        {userAchievements.slice(0, 3).map(a => (
          <span key={a.id} title={a.title} className="text-base">{a.emoji}</span>
        ))}
        {userAchievements.length > 3 && (
          <span className="text-xs text-gray-400">+{userAchievements.length - 3}</span>
        )}
      </div>
    </div>
  )
}

function RankingRow({ entry, position }) {
  const medal = getMedal(entry.rank)
  const isMe = entry.id === 'user-giovana'
  const progress = ((entry.completedDays?.length || 0) / 21) * 100
  const userAchievements = ACHIEVEMENTS.filter(a => a.condition(entry.completedDays || []))

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
      isMe ? 'bg-lilac-50 border border-lilac-200' : 'hover:bg-gray-50'
    }`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
        medal ? `${medal.bg} ${medal.text}` : 'bg-gray-100 text-gray-500'
      }`}>
        {medal ? medal.emoji : entry.rank}
      </div>

      <Link to={`/perfil/${entry.id}`}>
        <Avatar src={entry.avatar} name={entry.name} size="md" ring={isMe} />
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <Link to={`/perfil/${entry.id}`} className="font-semibold text-gray-900 hover:text-lilac-600 transition-colors text-sm">
            {entry.name}
          </Link>
          {isMe && <Badge variant="lilac">Você</Badge>}
          <span className="text-xs text-gray-400 hidden sm:inline">{entry.username}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-[120px]">
            <div className="h-full gradient-bg rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-xs text-gray-400">{entry.completedDays?.length || 0}/21</span>
        </div>
      </div>

      <div className="hidden sm:flex gap-1 flex-shrink-0">
        {userAchievements.slice(0, 4).map(a => (
          <span key={a.id} title={a.title} className="text-sm">{a.emoji}</span>
        ))}
      </div>

      <div className="flex items-center gap-1 text-coral-500 font-bold text-sm flex-shrink-0">
        🔥 {entry.streak}
      </div>
    </div>
  )
}

export default function Ranking() {
  const topThree = RANKING.slice(0, 3)
  const rest = RANKING.slice(3)
  const myRank = RANKING.find(e => e.id === 'user-giovana')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link to="/comunidade" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-lilac-600 transition-colors mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para a comunidade
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">🏆 Ranking</h1>
          <p className="text-gray-500 text-sm">Atualizado em tempo real · baseado em streak de dias</p>
        </div>

        {/* Top 3 podium */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {topThree.map(entry => (
            <TopThreeCard key={entry.id} entry={entry} />
          ))}
        </div>

        {/* Rest of ranking */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Participante</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Streak</span>
          </div>
          <div className="space-y-1">
            {rest.map(entry => (
              <RankingRow key={entry.id} entry={entry} />
            ))}
          </div>
        </div>

        {/* Your position highlight (if not in visible ranking) */}
        {myRank && myRank.rank > RANKING.length && (
          <div className="bg-lilac-50 border border-lilac-200 rounded-2xl p-4 text-center">
            <p className="text-sm text-lilac-700">
              Você está na posição <strong>#{myRank.rank}</strong> com {myRank.streak} dias de streak.
              Continue completando tarefas para subir! 💜
            </p>
          </div>
        )}

        {/* Achievement legend */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-gray-900 mb-4">Conquistas disponíveis</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ACHIEVEMENTS.map(a => (
              <div key={a.id} className="flex items-start gap-2">
                <span className="text-xl flex-shrink-0">{a.emoji}</span>
                <div>
                  <p className="text-xs font-semibold text-gray-900">{a.title}</p>
                  <p className="text-xs text-gray-400 leading-tight">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
