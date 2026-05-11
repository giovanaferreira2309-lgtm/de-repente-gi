import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FEED_POSTS, PARTICIPANTS } from '../data/mockData'
import Avatar from '../components/Avatar'

const MOCK_FEED_PREVIEW = FEED_POSTS.slice(0, 4)

function AnimatedFeedCard({ post, delay = 0 }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <div
      className={`bg-white rounded-2xl p-4 shadow-sm border border-lilac-100 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-start gap-3">
        <Avatar src={post.user.avatar} name={post.user.name} size="sm" ring />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-gray-900">{post.user.name}</span>
            <span className="text-xs text-lilac-500 bg-lilac-50 px-2 py-0.5 rounded-full">Dia {post.day}</span>
          </div>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{post.text}</p>
          <div className="flex gap-3 mt-2 text-xs text-gray-400">
            <span>🔥 {post.reactions.fire}</span>
            <span>✨ {post.reactions.sparkles}</span>
            <span>💪 {post.reactions.muscle}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function CountUp({ end, duration = 2000 }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration])
  return count
}

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false)
  useEffect(() => { setTimeout(() => setHeroVisible(true), 100) }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar pública */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold gradient-text">Do Zero ao Viver de Internet</span>
          <Link
            to="/comunidade"
            className="text-sm font-semibold px-4 py-2 gradient-bg text-white rounded-full hover:opacity-90 transition-opacity"
          >
            Entrar na comunidade
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-lilac-200 rounded-full opacity-30 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-coral-200 rounded-full opacity-25 blur-3xl" />
        </div>

        <div className={`max-w-3xl mx-auto text-center relative transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-lilac-50 border border-lilac-200 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-lilac-700 font-medium">47 mulheres já participando</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Do zero ao<br />
            <span className="gradient-text">primeiro real online</span><br />
            em 21 dias.
          </h1>

          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Não é mais um curso que você não vai terminar. É um desafio real,<br className="hidden md:block" />
            com tarefas diárias, uma comunidade que te apoia e <strong className="text-gray-700">conquistas visíveis todo dia.</strong>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/comunidade"
              className="gradient-bg text-white font-bold text-lg px-8 py-4 rounded-2xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-lilac-200"
            >
              Quero participar — R$47 💜
            </Link>
            <a href="#como-funciona" className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors">
              Entender como funciona ↓
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-400">
            <span>✓ Sem contrato</span>
            <span>✓ Acesso imediato</span>
            <span>✓ Comunidade real</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-lilac-50 to-coral-50 py-12 px-4">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { value: 47, label: 'participantes ativas', suffix: '' },
            { value: 21, label: 'dias de desafio', suffix: '' },
            { value: 312, label: 'conquistas postadas', suffix: '+' },
          ].map(({ value, label, suffix }) => (
            <div key={label}>
              <div className="text-3xl md:text-4xl font-extrabold gradient-text">
                <CountUp end={value} />{suffix}
              </div>
              <div className="text-xs md:text-sm text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* O que é */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Uma comunidade gamificada.<br />
              <span className="gradient-text">Não mais um curso.</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              A diferença está na ação coletiva. Você não assiste aulas — você faz, posta e evolui junto com outras mulheres.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '📅',
                title: '21 dias, 21 tarefas',
                text: 'Uma tarefa por dia, progressiva, do mais simples ao mais ambicioso. Cada dia desbloqueado é uma nova conquista.',
              },
              {
                icon: '🤝',
                title: 'Comunidade real',
                text: 'Um feed de conquistas onde você vê o progresso das outras, reage, comenta e recebe apoio de verdade.',
              },
              {
                icon: '🏆',
                title: 'Sua evolução visível',
                text: 'Tracking de progresso, streak de dias, ranking — tudo pra você sentir que está avançando de verdade.',
              },
            ].map(({ icon, title, text }) => (
              <div key={title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm card-hover">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview do Feed */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
              O feed das participantes
            </h2>
            <p className="text-gray-500">Conquistas reais. Toda hora. Da comunidade pra você.</p>
          </div>

          <div className="space-y-3 relative">
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none" />
            {MOCK_FEED_PREVIEW.map((post, i) => (
              <AnimatedFeedCard key={post.id} post={post} delay={i * 200} />
            ))}
          </div>

          <div className="text-center mt-8 relative z-20">
            <Link
              to="/comunidade"
              className="inline-block bg-white border-2 border-lilac-300 text-lilac-700 font-semibold px-6 py-3 rounded-full hover:bg-lilac-50 transition-colors"
            >
              Ver feed completo da comunidade →
            </Link>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Como funciona?</h2>
            <p className="text-gray-500">Simples o suficiente pra você começar hoje.</p>
          </div>

          <div className="space-y-6">
            {[
              {
                step: '01',
                title: 'Entrou',
                desc: 'Você paga, entra na plataforma e é recebida pela comunidade. Sem burocracia. Já tem acesso ao Dia 1.',
                color: 'from-lilac-400 to-lilac-500',
              },
              {
                step: '02',
                title: 'Fez a tarefa',
                desc: 'Todo dia uma tarefa nova é desbloqueada. São pequenas, práticas e progressivas — pra te tirar da teoria.',
                color: 'from-coral-400 to-coral-500',
              },
              {
                step: '03',
                title: 'Postou aqui',
                desc: 'Você posta seu resultado no feed da comunidade. Recebe reações, comentários, apoio. E segue pro próximo dia.',
                color: 'from-lilac-500 to-coral-400',
              },
            ].map(({ step, title, desc, color }) => (
              <div key={step} className="flex gap-5 items-start">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-extrabold text-lg flex-shrink-0`}>
                  {step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Participantes */}
      <section className="bg-lilac-50 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Já estão no desafio</h2>
          <div className="flex justify-center -space-x-3 mb-6">
            {PARTICIPANTS.slice(0, 7).map((p) => (
              <img key={p.id} src={p.avatar} alt={p.name} className="w-12 h-12 rounded-full ring-2 ring-white object-cover" />
            ))}
            <div className="w-12 h-12 rounded-full ring-2 ring-white gradient-bg flex items-center justify-center text-white text-xs font-bold">
              +40
            </div>
          </div>
          <p className="text-gray-600 mb-2">
            <strong className="text-gray-900">47 mulheres</strong> já começaram a transformação
          </p>
          <p className="text-sm text-gray-400">Novas vagas disponíveis toda segunda-feira</p>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-full bg-gradient-to-b from-lilac-50 to-white opacity-60" />
        </div>
        <div className="max-w-2xl mx-auto text-center relative">
          <div className="text-5xl mb-6 animate-float">💜</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Chega de esperar o<br />
            <span className="gradient-text">momento certo.</span>
          </h2>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed">
            O momento é agora. Com R$47, um acesso e 21 dias de ação.<br />
            Você não precisa de mais um curso. Precisa de uma comunidade.
          </p>
          <Link
            to="/comunidade"
            className="inline-block gradient-bg text-white font-bold text-xl px-10 py-5 rounded-2xl hover:opacity-90 transition-all hover:scale-105 shadow-xl shadow-lilac-200"
          >
            Entrar agora por R$47 →
          </Link>
          <p className="text-xs text-gray-400 mt-4">Pagamento único • Acesso imediato • Sem renovação automática</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-4 text-center text-sm text-gray-400">
        <p>© 2024 Do Zero ao Viver de Internet. Feito com 💜 para mulheres que agem.</p>
      </footer>
    </div>
  )
}
