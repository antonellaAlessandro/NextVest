function FondoLR() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute w-full h-full opacity-[0.07]" preserveAspectRatio="none">
        <defs>
          <pattern id="lineas" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="60" stroke="#22d3ee" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lineas)" className="animate-slide-lines" />
      </svg>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 blur-3xl rounded-full" />
    </div>
  )
}

export default FondoLR