import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BIBLIOTECA_LINKS, BIBLIOTECA_VIDEOS } from '../data/mockData'

const LINK_CATEGORIES = ['todos', 'conteúdo', 'perfil', 'crescimento', 'ferramentas', 'negócio', 'produção']
const VIDEO_CATEGORIES = ['todos', 'estratégia', 'conteúdo', 'produtividade', 'crescimento', 'vendas', 'marca pessoal']

function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full capitalize transition-all ${
            active === cat ? 'gradient-bg text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

function LinkCard({ link }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-lilac-200 transition-all card-hover"
    >
      <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center text-xl flex-shrink-0">
        {link.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 text-sm group-hover:text-lilac-700 transition-colors leading-snug">
            {link.title}
          </h3>
          <svg className="w-4 h-4 text-gray-300 group-hover:text-lilac-400 flex-shrink-0 mt-0.5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
        <p className="text-xs text-gray-500 mt-1 leading-snug">{link.description}</p>
        <span className="inline-block mt-2 text-[10px] font-medium px-2 py-0.5 bg-lilac-50 text-lilac-600 rounded-full capitalize">
          {link.category}
        </span>
      </div>
    </a>
  )
}

function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-lilac-200 transition-all card-hover">
      <div className="relative group cursor-pointer" onClick={() => setPlaying(true)}>
        <img src={video.thumbnail} alt={video.title} className="w-full h-44 object-cover" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5 text-lilac-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full">
          {video.duration}
        </div>
      </div>
      <div className="p-4">
        <span className="inline-block mb-2 text-[10px] font-medium px-2 py-0.5 bg-lilac-50 text-lilac-600 rounded-full capitalize">
          {video.category}
        </span>
        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1">{video.title}</h3>
        <p className="text-xs text-gray-500 leading-snug">{video.description}</p>
      </div>
    </div>
  )
}

export default function Biblioteca() {
  const [linkCat, setLinkCat] = useState('todos')
  const [videoCat, setVideoCat] = useState('todos')
  const [activeSection, setActiveSection] = useState('videos')

  const filteredLinks = linkCat === 'todos' ? BIBLIOTECA_LINKS : BIBLIOTECA_LINKS.filter(l => l.category === linkCat)
  const filteredVideos = videoCat === 'todos' ? BIBLIOTECA_VIDEOS : BIBLIOTECA_VIDEOS.filter(v => v.category === videoCat)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/comunidade" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-lilac-600 transition-colors mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para a comunidade
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">📚 Biblioteca</h1>
          <p className="text-gray-500 leading-relaxed">
            Recursos curados para acelerar sua jornada. Videoaulas, ferramentas e leituras selecionadas a dedo.
          </p>
        </div>

        {/* Section tabs */}
        <div className="flex gap-2 mb-8 bg-white rounded-xl p-1 border border-gray-100 w-fit">
          {[
            { id: 'videos', label: '🎬 Videoaulas' },
            { id: 'links', label: '🔗 Links úteis' },
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeSection === s.id ? 'gradient-bg text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Videoaulas */}
        {activeSection === 'videos' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">{filteredVideos.length} videoaulas</h2>
            </div>
            <div className="mb-4">
              <CategoryFilter categories={VIDEO_CATEGORIES} active={videoCat} onChange={setVideoCat} />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVideos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
            {filteredVideos.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <div className="text-4xl mb-3">📭</div>
                <p className="text-sm">Nenhuma videoaula nessa categoria ainda.</p>
              </div>
            )}
          </div>
        )}

        {/* Links */}
        {activeSection === 'links' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">{filteredLinks.length} recursos</h2>
            </div>
            <div className="mb-4">
              <CategoryFilter categories={LINK_CATEGORIES} active={linkCat} onChange={setLinkCat} />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {filteredLinks.map(link => (
                <LinkCard key={link.id} link={link} />
              ))}
            </div>
            {filteredLinks.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <div className="text-4xl mb-3">📭</div>
                <p className="text-sm">Nenhum link nessa categoria ainda.</p>
              </div>
            )}
          </div>
        )}

        {/* CTA bottom */}
        <div className="mt-12 bg-gradient-to-r from-lilac-50 to-coral-50 border border-lilac-100 rounded-2xl p-6 text-center">
          <p className="text-sm text-gray-600 mb-1">Tem um recurso incrível pra indicar?</p>
          <p className="text-xs text-gray-400">Compartilhe no feed da comunidade com a tag #recurso 💜</p>
          <Link
            to="/comunidade"
            className="inline-block mt-4 gradient-bg text-white font-semibold text-sm px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Ir para o feed →
          </Link>
        </div>
      </div>
    </div>
  )
}
