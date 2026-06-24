function FondoAurora() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/20 blur-3xl rounded-full animate-aurora-1" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500/15 blur-3xl rounded-full animate-aurora-2" />
      <div className="absolute bottom-0 left-1/3 w-[550px] h-[550px] bg-cyan-400/15 blur-3xl rounded-full animate-aurora-3" />
    </div>
  )
}

export default FondoAurora