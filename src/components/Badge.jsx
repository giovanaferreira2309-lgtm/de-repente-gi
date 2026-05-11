const variants = {
  lilac: 'bg-lilac-100 text-lilac-700 border-lilac-200',
  coral: 'bg-coral-50 text-coral-500 border-coral-200',
  green: 'bg-green-50 text-green-600 border-green-200',
  gray: 'bg-gray-100 text-gray-600 border-gray-200',
  gold: 'bg-yellow-50 text-yellow-700 border-yellow-200',
}

export default function Badge({ children, variant = 'lilac', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
