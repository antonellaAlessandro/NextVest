import { useState } from 'react'
import { Link } from 'react-router-dom'

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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/login" className="text-lg font-bold text-blue-600">
            NextVest
          </Link>
          <div className="flex gap-6">
            <Link to="/quienes-somos" className="text-sm text-gray-600 hover:text-blue-600">
              Quiénes somos
            </Link>
            <Link to="/login" className="text-sm text-gray-600 hover:text-blue-600">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Educación financiera</h1>

        <div className="flex gap-2 mb-6">
          {SECCIONES.map((seccion, index) => (
            <button
              key={index}
              onClick={() => setSeccionActiva(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                seccionActiva === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {seccion.titulo}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {SECCIONES[seccionActiva].contenido.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-medium text-gray-800 mb-2">{item.termino}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.definicion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Educacion