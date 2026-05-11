export default function Avatar({ src, name, size = 'md', ring = false }) {
  const sizes = { sm: 'w-7 h-7 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-base', xl: 'w-20 h-20 text-xl' }
  const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className={`${sizes[size]} rounded-full overflow-hidden flex-shrink-0 ${ring ? 'ring-2 ring-lilac-300' : ''}`}>
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full gradient-bg flex items-center justify-center text-white font-semibold">
          {initials}
        </div>
      )}
    </div>
  )
}
