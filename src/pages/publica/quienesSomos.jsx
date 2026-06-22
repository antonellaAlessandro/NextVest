import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function QuienesSomos() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-slate-800/50 px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight">
            Next<span className="text-cyan-400">Vest</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link to="/educacion" className="text-sm text-slate-400 hover:text-white transition-colors">
              Educación
            </Link>
            <Link to="/login" className="text-sm text-slate-300 hover:text-white transition-colors">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold mb-3">
            Quiénes somos
          </h1>
          <p className="text-slate-400">
            La historia detrás de la educación financiera para la próxima generación
          </p>
        </motion.div>

        <div className="space-y-6">
          <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8"
            >
            <h2 className="font-semibold mb-3 text-cyan-400">Nuestra misión</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              NextVest nace con el objetivo de acercar la educación financiera a adolescentes
              de entre 13 y 17 años, permitiéndoles aprender a invertir con instrumentos reales
              bajo un entorno seguro de saldo virtual.
            </p>
          </motion.div>

         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8"
            >
            <h2 className="font-semibold mb-3 text-cyan-400">Marco normativo</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              La plataforma opera en el marco de la RG CNV 1091/2025 de la Comisión Nacional
              de Valores, que regula el acceso de menores a productos financieros educativos
              con las salvaguardas correspondientes, incluyendo la autorización del
              representante legal y la operatoria exclusivamente con saldo virtual.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8"
            >
            <h2 className="font-semibold mb-3 text-cyan-400">Nuestro equipo</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Un equipo comprometido con la educación financiera y la tecnología, trabajando
              para que cada vez más jóvenes puedan entender el mundo de las inversiones de
              forma responsable y segura.
            </p>
          </motion.div>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/"
            className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

export default QuienesSomos