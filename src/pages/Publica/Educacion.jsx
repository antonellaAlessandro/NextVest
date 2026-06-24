import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const SECCIONES = [
  {
    titulo: 'Glosario de términos',
    contenido: [
      { termino: 'FCI', definicion: 'Fondo Común de Inversión. Un conjunto de activos administrado por una sociedad gerente donde varios inversores aportan dinero.' },
      { termino: 'Cedear', definicion: 'Certificado que representa acciones de empresas extranjeras, pero que cotiza en el mercado argentino.' },
      { termino: 'Bono', definicion: 'Instrumento de deuda emitido por un gobierno o empresa que paga intereses a quien lo compra.' },
      { termino: 'Acción', definicion: 'Una parte de la propiedad de una empresa que cotiza en bolsa.' },
      { termino: 'Portafolio', definicion: 'El conjunto de todas las inversiones que tiene una persona.' },
      { termino: 'Perfil de riesgo', definicion: 'Una evaluación de cuánto riesgo está dispuesto a asumir un inversor.' }
    ]
  },
  {
    titulo: 'Tipos de instrumentos',
    contenido: [
      { termino: 'FCI Money Market', definicion: 'El instrumento de menor riesgo, ideal para perfiles conservadores. Invierte en activos de muy corto plazo.' },
      { termino: 'Bonos soberanos', definicion: 'Emitidos por el Estado Nacional, son una forma de prestarle dinero al gobierno a cambio de intereses.' },
      { termino: 'Cedears', definicion: 'Permiten invertir en empresas internacionales como Apple o Google sin salir del mercado argentino.' }
    ]
  },
  {
    titulo: 'Cómo armar tu perfil de riesgo',
    contenido: [
      { termino: '¿Por qué es importante?', definicion: 'Define qué instrumentos podés operar según tu tolerancia al riesgo y tus objetivos.' },
      { termino: '¿Puedo cambiarlo?', definicion: 'Sí, podés repetir el cuestionario en cualquier momento desde Mi cuenta.' }
    ]
  }
]

function Educacion() {
  const [seccionActiva, setSeccionActiva] = useState(0)

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-slate-800/50 px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight">
            Next<span className="text-cyan-400">Vest</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link to="/quienes-somos" className="text-sm text-slate-400 hover:text-white transition-colors">
              Quiénes somos
            </Link>
            <Link to="/login" className="text-sm text-slate-300 hover:text-white transition-colors">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold mb-3">Educación financiera</h1>
          <p className="text-slate-400">
            Todo lo que necesitás entender antes de empezar a invertir
          </p>
        </motion.div>

        <div className="flex gap-2 mb-8 flex-wrap justify-center">
          {SECCIONES.map((seccion, index) => (
            <button
              key={index}
              onClick={() => setSeccionActiva(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                seccionActiva === index
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {seccion.titulo}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {SECCIONES[seccionActiva].contenido.map((item, index) => (
            <motion.div
              key={item.termino}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
            >
              <h3 className="font-semibold mb-2 text-cyan-400">{item.termino}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.definicion}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Educacion