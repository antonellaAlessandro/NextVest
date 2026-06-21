import { Link } from 'react-router-dom'

function QuienesSomos() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/login" className="text-lg font-bold text-blue-600">
            NextVest
          </Link>
          <div className="flex gap-6">
            <Link to="/educacion" className="text-sm text-gray-600 hover:text-blue-600">
              Educación
            </Link>
            <Link to="/login" className="text-sm text-gray-600 hover:text-blue-600">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Quiénes somos</h1>

        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <h2 className="font-medium text-gray-800 mb-3">Nuestra misión</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            NextVest nace con el objetivo de acercar la educación financiera a adolescentes
            de entre 13 y 17 años, permitiéndoles aprender a invertir con instrumentos reales
            bajo un entorno seguro de saldo virtual.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <h2 className="font-medium text-gray-800 mb-3">Marco normativo</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            La plataforma opera en el marco de la RG CNV 1091/2025 de la Comisión Nacional
            de Valores, que regula el acceso de menores a productos financieros educativos
            con las salvaguardas correspondientes, incluyendo la autorización del
            representante legal y la operatoria exclusivamente con saldo virtual.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="font-medium text-gray-800 mb-3">Nuestro equipo</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Un equipo comprometido con la educación financiera y la tecnología, trabajando
            para que cada vez más jóvenes puedan entender el mundo de las inversiones de
            forma responsable y segura.
          </p>
        </div>
      </div>
    </div>
  )
}

export default QuienesSomos