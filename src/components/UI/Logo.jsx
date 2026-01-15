const Logo = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  return (
    <div className={`${sizeClasses[size]} bg-[#D4A574] rounded-full flex items-center justify-center relative overflow-hidden`}>
      {/* Curved black band - representing the logo */}
      <svg
        className="absolute inset-0"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 20 80 Q 30 50, 50 50 Q 70 50, 80 20"
          stroke="#000000"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export default Logo
