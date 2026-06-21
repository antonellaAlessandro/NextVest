import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { guardarPerfilRiesgo } from '../../services/usuario.service'
import Navbar from '../../components/Navbar'

const PREGUNTAS = [
  {
    id: '1',
    texto: '¿Qué harías si el valor de tu inversión bajara un 10%?',
    opciones: [
      { texto: 'Vendería todo de inmediato', valor: 1 },
      { texto: 'Esperaría a que se recupere', valor: 2 },
      { texto: 'Compraría más porque está más barato', valor: 3 }
    ]
  },
  {
    id: '2',
    texto: '¿Cuánto tiempo planeás mantener tus inversiones?',
    opciones: [
      { texto: 'Menos de 6 meses', valor: 1 },
      { texto: 'Entre 6 meses y 2 años', valor: 2 },
      { texto: 'Más de 2 años', valor: 3 }
    ]
  },
  {
    id: '3',
    texto: '¿Cuál es tu objetivo principal al invertir?',
    opciones: [
      { texto: 'Mantener mi dinero seguro', valor: 1 },
      { texto: 'Hacer crecer mi dinero de forma moderada', valor: 2 },
      { texto: 'Maximizar las ganancias aunque haya riesgo', valor: 3 }
    ]
  }
]

function PerfilRiesgo() {
  const [respuestas, setRespuestas] = useState({})
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate()

  function seleccionarRespuesta(preguntaId, valor) {
    setRespuestas({ ...respuestas, [preguntaId]: valor })
  }

  const todasRespondidas = PREGUNTAS.every((p) => respuestas[p.id] !== undefined)

  async function handleEnviar() {
    setEnviando(true)
    setError(null)
    try {
      const datos = await guardarPerfilRiesgo(respuestas)
      setResultado(datos.tipo)
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al guardar el perfil')
    } finally {
      setEnviando(false)
    }
  }

  if (resultado) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-md mx-auto px-6 py-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Tu perfil es:</h2>
            <p className="text-3xl font-bold text-blue-600 capitalize mb-6">{resultado}</p>
            <p className="text-sm text-gray-500 mb-6">
              {resultado === 'conservador'
                ? 'Vas a poder operar con FCI Money Market, instrumentos de muy bajo riesgo.'
                : 'Vas a poder operar con FCI, Bonos soberanos y Cedears.'}
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Ir al dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Perfil de riesgo</h2>
        <p className="text-sm text-gray-500 mb-8">
          Respondé estas preguntas para definir qué instrumentos podés operar.
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {PREGUNTAS.map((pregunta) => (
            <div key={pregunta.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <p className="font-medium text-gray-800 mb-4">{pregunta.texto}</p>
              <div className="space-y-2">
                {pregunta.opciones.map((opcion) => (
                  <button
                    key={opcion.valor}
                    onClick={() => seleccionarRespuesta(pregunta.id, opcion.valor)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                      respuestas[pregunta.id] === opcion.valor
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
                    }`}
                  >
                    {opcion.texto}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleEnviar}
          disabled={!todasRespondidas || enviando}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 mt-6"
        >
          {enviando ? 'Enviando...' : 'Finalizar cuestionario'}
        </button>
      </div>
    </div>
  )
}

export default PerfilRiesgo