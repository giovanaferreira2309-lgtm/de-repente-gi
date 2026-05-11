import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CHALLENGE_TASKS, CURRENT_USER, FEED_POSTS, RANKING, MOCK_COMMENTS } from '../data/mockData'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'

// ─── Day Tracker ────────────────────────────────────────────────────────────

function DayCard({ task, status, onClick }) {
  const base = 'relative flex flex-col items-center justify-center rounded-xl p-2 cursor-pointer transition-all text-center'
  const styles = {
    completed: `${base} bg-lilac-100 border-2 border-lilac-300 hover:border-lilac-400`,
    current: `${base} bg-white border-2 border-coral-400 shadow-md shadow-coral-100 hover:shadow-lg animate-pulse-slow`,
    locked: `${base} bg-gray-50 border-2 border-dashed border-gray-200 cursor-default opacity-60`,
  }

  return (
    <div className={styles[status]} onClick={status !== 'locked' ? onClick : undefined}>
      {status === 'completed' && (
        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-lilac-500 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
      {status === 'current' && (
        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-coral-400 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">!</span>
        </div>
      )}
      <span className="text-lg leading-none mb-0.5">{task.emoji}</span>
      <span className="text-xs font-bold text-gray-700">{task.day}</span>
      <span className="text-[9px] text-gray-500 leading-tight hidden sm:block mt-0.5 line-clamp-1">{task.title}</span>
    </div>
  )
}

function TaskModal({ task, onClose, onComplete }) {
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!text.trim()) return
    onComplete(task.day, text)
    setSubmitted(true)
    setTimeout(() => { onClose(); setSubmitted(false); setText('') }, 1500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slide-up" onClick={e => e.stopPropagation()}>
        {submitted ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Incrível! Dia {task.day} concluído!</h3>
            <p className="text-gray-500">Sua conquista foi postada no feed.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-2xl">{task.emoji}</div>
              <div>
                <Badge variant="coral">Dia {task.day}</Badge>
                <h3 className="font-bold text-gray-900 text-lg">{task.title}</h3>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4 bg-gray-50 rounded-xl p-3">{task.description}</p>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Conta como foi fazer essa tarefa... o que você aprendeu, como se sentiu, o que aconteceu 💜"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none h-28 focus:outline-none focus:ring-2 focus:ring-lilac-300 mb-4"
            />
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={!text.trim()}
                className="flex-1 py-2.5 gradient-bg text-white font-semibold rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                Concluir e Postar 🚀
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function DayTracker({ completedDays, currentDay, onCompleteTask }) {
  const [selectedTask, setSelectedTask] = useState(null)
  const progress = (completedDays.length / 21) * 100

  const getStatus = (day) => {
    if (completedDays.includes(day)) return 'completed'
    if (day === currentDay) return 'current'
    return 'locked'
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold text-gray-900 text-lg">Seu progresso</h2>
          <p className="text-sm text-gray-500">{completedDays.length} de 21 dias concluídos</p>
        </div>
        <div className="flex items-center gap-2 bg-coral-50 px-3 py-1.5 rounded-full">
          <span className="text-coral-500">🔥</span>
          <span className="text-sm font-bold text-coral-600">{completedDays.length} streak</span>
        </div>
      </div>

      <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden mb-5">
        <div
          className="absolute left-0 top-0 h-full gradient-bg rounded-full transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {CHALLENGE_TASKS.map((task) => (
          <DayCard
            key={task.day}
            task={task}
            status={getStatus(task.day)}
            onClick={() => setSelectedTask(task)}
          />
        ))}
      </div>

      {currentDay <= 21 && (
        <button
          onClick={() => setSelectedTask(CHALLENGE_TASKS[currentDay - 1])}
          className="w-full mt-4 gradient-bg text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity text-sm"
        >
          {CHALLENGE_TASKS[currentDay - 1]?.emoji} Concluir tarefa de hoje: {CHALLENGE_TASKS[currentDay - 1]?.title}
        </button>
      )}

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onComplete={onCompleteTask}
        />
      )}
    </div>
  )
}

// ─── Feed ────────────────────────────────────────────────────────────────────

function ReactionButton({ emoji, count, onReact }) {
  const [localCount, setLocalCount] = useState(count)
  const [reacted, setReacted] = useState(false)
  const handle = () => {
    if (reacted) { setLocalCount(c => c - 1); setReacted(false) }
    else { setLocalCount(c => c + 1); setReacted(true); onReact?.() }
  }
  return (
    <button
      onClick={handle}
      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
        reacted ? 'bg-lilac-100 text-lilac-700 scale-110' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
      }`}
    >
      {emoji} {localCount}
    </button>
  )
}

function PostCard({ post, filterDay }) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState(MOCK_COMMENTS[post.id] || [])

  const addComment = () => {
    if (!newComment.trim()) return
    setComments(prev => [...prev, {
      id: `c-${Date.now()}`,
      user: { name: CURRENT_USER.name, avatar: CURRENT_USER.avatar },
      text: newComment,
      timestamp: new Date().toISOString(),
    }])
    setNewComment('')
  }

  const timeAgo = (ts) => {
    const diff = Date.now() - new Date(ts).getTime()
    const h = Math.floor(diff / 3600000)
    if (h < 1) return 'agora há pouco'
    if (h < 24) return `${h}h atrás`
    return `${Math.floor(h / 24)}d atrás`
  }

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-fade-in">
      {post.image && (
        <img src={post.image} alt="" className="w-full h-40 object-cover" />
      )}
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Link to={`/perfil/${post.userId}`}>
            <Avatar src={post.user.avatar} name={post.user.name} size="md" ring />
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Link to={`/perfil/${post.userId}`} className="font-semibold text-gray-900 hover:text-lilac-600 transition-colors text-sm">
                {post.user.name}
              </Link>
              <Badge variant="lilac">Dia {post.day} — {post.dayTitle}</Badge>
            </div>
            <span className="text-xs text-gray-400">{timeAgo(post.timestamp)}</span>
          </div>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed mb-4">{post.text}</p>

        <div className="flex items-center gap-2 flex-wrap">
          <ReactionButton emoji="🔥" count={post.reactions.fire} />
          <ReactionButton emoji="✨" count={post.reactions.sparkles} />
          <ReactionButton emoji="💪" count={post.reactions.muscle} />
          <button
            onClick={() => setShowComments(v => !v)}
            className="ml-auto text-xs text-gray-400 hover:text-lilac-600 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {comments.length + post.comments - (MOCK_COMMENTS[post.id]?.length || 0)}
          </button>
        </div>

        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-50">
            <div className="space-y-3 mb-3">
              {comments.map(c => (
                <div key={c.id} className="flex items-start gap-2">
                  <Avatar src={c.user.avatar} name={c.user.name} size="sm" />
                  <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2">
                    <span className="font-semibold text-xs text-gray-900">{c.user.name}</span>
                    <p className="text-xs text-gray-600 mt-0.5">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Avatar src={CURRENT_USER.avatar} name={CURRENT_USER.name} size="sm" />
              <input
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addComment()}
                placeholder="Escreva um comentário..."
                className="flex-1 text-xs bg-gray-50 border border-gray-100 rounded-full px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-lilac-200"
              />
              <button onClick={addComment} className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center text-white text-xs hover:opacity-90">
                ↑
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

function FeedSection({ filterDay, setFilterDay }) {
  const filtered = filterDay === null ? FEED_POSTS : FEED_POSTS.filter(p => p.day === filterDay)
  const days = [...new Set(FEED_POSTS.map(p => p.day))].sort((a, b) => a - b)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900 text-lg">Feed de conquistas</h2>
        <span className="text-xs text-gray-400">{FEED_POSTS.length} posts</span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-4">
        <button
          onClick={() => setFilterDay(null)}
          className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-all ${
            filterDay === null ? 'gradient-bg text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Todos
        </button>
        {days.map(d => (
          <button
            key={d}
            onClick={() => setFilterDay(d === filterDay ? null : d)}
            className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-all ${
              filterDay === d ? 'gradient-bg text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Dia {d}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-sm">Nenhum post nesse dia ainda.</p>
          </div>
        ) : (
          filtered.map(post => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  )
}

// ─── Ranking ─────────────────────────────────────────────────────────────────

function RankingSection({ userRank = 8 }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🏆</span>
        <h2 className="font-bold text-gray-900">Ranking</h2>
        <span className="text-xs text-gray-400 ml-auto">por streak</span>
      </div>

      <div className="space-y-3">
        {RANKING.map(({ rank, name, avatar, completedDays, streak, badge }) => (
          <div key={rank} className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${rank <= 3 ? 'bg-lilac-50' : 'hover:bg-gray-50'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
              rank === 1 ? 'bg-yellow-100 text-yellow-700' : rank === 2 ? 'bg-gray-100 text-gray-600' : rank === 3 ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-500'
            }`}>
              {badge || rank}
            </div>
            <img src={avatar} alt={name} className="w-8 h-8 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">{name}</div>
              <div className="text-xs text-gray-400">{completedDays.length} dias</div>
            </div>
            <div className="text-xs font-bold text-coral-500 flex items-center gap-1">
              🔥 {streak}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-lilac-50 border border-lilac-200">
          <div className="w-7 h-7 rounded-full bg-lilac-100 flex items-center justify-center text-xs font-bold text-lilac-700 flex-shrink-0">
            {userRank}
          </div>
          <img src={CURRENT_USER.avatar} alt={CURRENT_USER.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-lilac-300" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-lilac-700 truncate">Você — {CURRENT_USER.name}</div>
            <div className="text-xs text-lilac-400">{CURRENT_USER.completedDays.length} dias concluídos</div>
          </div>
          <div className="text-xs font-bold text-coral-500">🔥 {CURRENT_USER.streak}</div>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center mt-3">
        Complete mais dias para subir no ranking 💜
      </p>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Community() {
  const [filterDay, setFilterDay] = useState(null)
  const [completedDays, setCompletedDays] = useState(CURRENT_USER.completedDays)
  const [currentDay, setCurrentDay] = useState(CURRENT_USER.currentDay)
  const [activeTab, setActiveTab] = useState('feed')

  const handleCompleteTask = (day) => {
    if (!completedDays.includes(day)) {
      setCompletedDays(prev => [...prev, day])
      if (day === currentDay) setCurrentDay(prev => Math.min(prev + 1, 21))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Welcome banner */}
        <div className="gradient-bg rounded-2xl p-5 mb-6 flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm mb-0.5">Bem-vinda de volta,</p>
            <h1 className="text-white font-extrabold text-2xl">{CURRENT_USER.name} 👋</h1>
            <p className="text-white/70 text-sm mt-1">
              {completedDays.length} dias concluídos · Dia atual: {currentDay}
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-extrabold text-white">{completedDays.length}<span className="text-white/60 text-2xl">/21</span></div>
            <div className="text-white/70 text-xs mt-1">dias do desafio</div>
          </div>
        </div>

        {/* Tracker */}
        <div className="mb-6">
          <DayTracker
            completedDays={completedDays}
            currentDay={currentDay}
            onCompleteTask={handleCompleteTask}
          />
        </div>

        {/* Mobile tabs */}
        <div className="flex lg:hidden gap-2 mb-4 bg-white rounded-xl p-1 border border-gray-100">
          {['feed', 'ranking'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === tab ? 'gradient-bg text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'feed' ? '📰 Feed' : '🏆 Ranking'}
            </button>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="flex gap-6">
          {/* Feed */}
          <div className={`flex-1 min-w-0 ${activeTab !== 'feed' ? 'hidden lg:block' : ''}`}>
            <FeedSection filterDay={filterDay} setFilterDay={setFilterDay} />
          </div>

          {/* Ranking sidebar */}
          <div className={`w-72 flex-shrink-0 ${activeTab !== 'ranking' ? 'hidden lg:block' : 'w-full'}`}>
            <RankingSection />
          </div>
        </div>
      </div>
    </div>
  )
}
