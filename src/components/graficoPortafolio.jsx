const COLORES = {
  FCI: '#22d3ee',
  Bono: '#a78bfa',
  Cedear: '#34d399',
  Accion: '#fbbf24'
}

function GraficoPortafolio({ posiciones }) {
  if (!posiciones || posiciones.length === 0) {
    return null
  }

  const totalesPorTipo = {}
  posiciones.forEach((pos) => {
    const tipo = pos.tipo || 'Otro'
    totalesPorTipo[tipo] = (totalesPorTipo[tipo] || 0) + pos.valor_actual
  })

  const valorTotal = Object.values(totalesPorTipo).reduce((acc, v) => acc + v, 0)

  let acumulado = 0
  const segmentos = Object.entries(totalesPorTipo).map(([tipo, valor]) => {
    const porcentaje = (valor / valorTotal) * 100
    const inicio = acumulado
    acumulado += porcentaje
    return { tipo, valor, porcentaje, inicio, fin: acumulado }
  })

  function coordenadasEnCirculo(porcentaje) {
    const angulo = (porcentaje / 100) * 360 - 90
    const radianes = (angulo * Math.PI) / 180
    return {
      x: 50 + 40 * Math.cos(radianes),
      y: 50 + 40 * Math.sin(radianes)
    }
  }

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
      <h3 className="font-medium text-white mb-4">Distribución por tipo</h3>

      <div className="flex items-center gap-8">
        <svg viewBox="0 0 100 100" className="w-32 h-32">
          {segmentos.map((seg) => {
            const inicio = coordenadasEnCirculo(seg.inicio)
            const fin = coordenadasEnCirculo(seg.fin)
            const grandeArco = seg.porcentaje > 50 ? 1 : 0

            return (
              <path
                key={seg.tipo}
                d={`M 50 50 L ${inicio.x} ${inicio.y} A 40 40 0 ${grandeArco} 1 ${fin.x} ${fin.y} Z`}
                fill={COLORES[seg.tipo] || '#64748b'}
              />
            )
          })}
        </svg>

        <div className="space-y-2">
          {segmentos.map((seg) => (
            <div key={seg.tipo} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORES[seg.tipo] || '#64748b' }}
              />
              <p className="text-sm text-slate-300">
                {seg.tipo} <span className="text-slate-500">({seg.porcentaje.toFixed(0)}%)</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GraficoPortafolio