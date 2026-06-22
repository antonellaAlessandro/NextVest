import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Inicio() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-slate-800/50 px-6 py-5"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-xl font-bold tracking-tight">
            Next<span className="text-cyan-400">Vest</span>
          </p>
          <div className="flex items-center gap-8">
            <Link to="/educacion" className="text-sm text-slate-400 hover:text-white transition-colors">
              Educación
            </Link>
            <Link to="/quienes-somos" className="text-sm text-slate-400 hover:text-white transition-colors">
              Quiénes somos
            </Link>
            <Link to="/login" className="text-sm text-slate-300 hover:text-white transition-colors">
              Iniciar sesión
            </Link>
            <Link
              to="/registro"
              className="text-sm bg-cyan-500 text-slate-950 px-4 py-2 rounded-lg font-medium hover:bg-cyan-400 transition-colors"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 py-32 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-3xl rounded-full -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 text-xs text-slate-400 mb-8"
        >
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
          Educación financiera para la próxima generación
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight"
        >
          Invertí, aprendé,<br />
          <span className="text-cyan-400">crecé</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          El primer broker educativo pensado para adolescentes de 13 a 17 años.
          Operá con instrumentos financieros reales, con saldo virtual, en un
          entorno 100% seguro.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex items-center justify-center gap-4"
        >
          <Link
            to="/registro"
            className="bg-cyan-500 text-slate-950 px-8 py-3.5 rounded-xl font-semibold hover:bg-cyan-400 transition-all hover:scale-105"
          >
            Crear cuenta gratis
          </Link>
          <Link
            to="/educacion"
            className="border border-slate-700 text-slate-300 px-8 py-3.5 rounded-xl font-medium hover:border-slate-500 hover:text-white transition-colors"
          >
            Conocer más
          </Link>
        </motion.div>
      </div>

      {/* Mockup flotante */}
      <motion.div
        initial={{ opacity: 0, y: 60, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
        style={{ perspective: 1000 }}
        className="max-w-3xl mx-auto px-6 -mt-8 mb-16 relative"
      >
        <div className="absolute inset-0 bg-cyan-500/5 blur-3xl -z-10" />

        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-cyan-500/5 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-900/80">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <p className="text-xs text-slate-500 ml-2">nextvest.com/mercado</p>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <p className="font-semibold text-sm">Mercado</p>
              <div className="flex gap-2">
                <span className="text-xs bg-cyan-500 text-slate-950 px-3 py-1 rounded-md font-medium">Todos</span>
                <span className="text-xs text-slate-500 px-3 py-1">FCI</span>
                <span className="text-xs text-slate-500 px-3 py-1">Cedear</span>
              </div>
            </div>

            <div className="space-y-2">
              {[
                { nombre: 'Fondo Money Market AR', ticker: 'FCI_MM', precio: '$1,05', variacion: '+0,2%', positivo: true },
                { nombre: 'Cedear Apple', ticker: 'AAPL', precio: '$12.400', variacion: '+1,8%', positivo: true },
                { nombre: 'Bono Soberano 2027', ticker: 'TX27', precio: '$98,50', variacion: '-0,4%', positivo: false }
              ].map((item, index) => (
                <motion.div
                  key={item.ticker}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.15 }}
                  className="flex items-center justify-between bg-slate-800/50 rounded-lg px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">{item.nombre}</p>
                    <p className="text-xs text-slate-500">{item.ticker}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{item.precio}</p>
                    <p className={`text-xs ${item.positivo ? 'text-emerald-400' : 'text-red-400'}`}>
                      {item.variacion}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Frase puente */}
      <div className="text-center max-w-2xl mx-auto px-6 mb-24">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-semibold text-white leading-snug"
        >
          Así se ve por dentro.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-lg text-slate-400 mt-2"
        >
          Simple, directo, sin vueltas — todo lo que necesitás para empezar
          a invertir está a un clic.
        </motion.p>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-3 gap-6">
          {[
            { titulo: 'Mercado real', texto: 'FCI, bonos soberanos y Cedears, con precios actualizados del mercado real.', icono: 'ti-chart-line' },
            { titulo: '100% seguro', texto: 'Saldo virtual, autorización parental y marco regulatorio CNV 1091/2025.', icono: 'ti-shield-check' },
            { titulo: 'Educación primero', texto: 'Glosario, guías y contenido pensado para que entiendas antes de invertir.', icono: 'ti-school' }
          ].map((feature, index) => (
            <motion.div
              key={feature.titulo}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/30 transition-colors"
            >
              <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                <i className={`ti ${feature.icono} text-cyan-400 text-xl`}></i>
              </div>
              <h3 className="font-semibold mb-2">{feature.titulo}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.texto}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gráfico de crecimiento */}
      <div className="border-y border-slate-800/50 bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-3">Tu dinero, creciendo de verdad</h2>
            <p className="text-slate-400">Simulación de una inversión en FCI Money Market a lo largo de 12 meses</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-sm text-slate-400 mb-1">Valor del portafolio</p>
                <p className="text-3xl font-bold text-white">$127.450</p>
              </div>
              <span className="text-sm bg-cyan-500/10 text-cyan-400 px-3 py-1.5 rounded-full font-medium">
                +27,4%
              </span>
            </div>

            <svg viewBox="0 0 600 200" className="w-full h-48">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
              </defs>

              {[0, 1, 2, 3].map((i) => (
                <line
                  key={i}
                  x1="0" y1={50 * i + 10} x2="600" y2={50 * i + 10}
                  stroke="#1e293b" strokeWidth="1"
                />
              ))}

              <motion.path
                d="M 0 170 Q 80 165, 130 150 T 230 130 T 330 100 T 430 70 T 530 40 L 600 20"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              <motion.path
                d="M 0 170 Q 80 165, 130 150 T 230 130 T 330 100 T 430 70 T 530 40 L 600 20 L 600 200 L 0 200 Z"
                fill="url(#areaGradient)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1 }}
              />
            </svg>

            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>Ene</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
              <span>Nov</span>
            </div>
          </motion.div>

          <p className="text-center text-xs text-slate-500 mt-6">
            * Simulación con fines ilustrativos. Los rendimientos pasados no garantizan resultados futuros.
          </p>
        </div>
      </div>

      {/* Cómo funciona */}
      <div className="max-w-5xl mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-3">Cómo funciona</h2>
          <p className="text-slate-400">Tres pasos y ya estás invirtiendo</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px bg-slate-800" />

          {[
            { numero: '01', titulo: 'Te registrás', texto: 'Completás tus datos y los de tu representante legal en menos de 2 minutos.' },
            { numero: '02', titulo: 'Aprueban tu cuenta', texto: 'Tu representante recibe un email y autoriza la apertura desde ahí.' },
            { numero: '03', titulo: 'Empezás a invertir', texto: 'Completás tu perfil de riesgo y ya podés operar en el mercado.' }
          ].map((paso, index) => (
            <motion.div
              key={paso.numero}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center"
            >
              <div className="w-16 h-16 bg-slate-900 border-2 border-cyan-500/30 rounded-full flex items-center justify-center mx-auto mb-5 relative z-10">
                <span className="text-cyan-400 font-bold">{paso.numero}</span>
              </div>
              <h3 className="font-semibold mb-2">{paso.titulo}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{paso.texto}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Casos de uso */}
      <div className="max-w-5xl mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-3">Pensado para vos</h2>
          <p className="text-slate-400">Así es como otros adolescentes empiezan a invertir</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-6">
          {[
            {
              nombre: 'Sofía, 15 años',
              texto: 'Empecé con $5.000 virtuales en un Fondo Money Market para entender cómo funciona antes de animarme con algo más grande.',
              perfil: 'Conservador'
            },
            {
              nombre: 'Mateo, 16 años',
              texto: 'Me gusta seguir las acciones de empresas que conozco. Con los Cedears puedo invertir en Apple sin salir de Argentina.',
              perfil: 'Moderado'
            },
            {
              nombre: 'Lucía, 17 años',
              texto: 'El cuestionario de perfil de riesgo me ayudó a entender qué tipo de inversora soy antes de arriesgar nada.',
              perfil: 'Moderado'
            },
            {
              nombre: 'Tomás, 14 años',
              texto: 'Mi viejo me ayudó a entender qué es un bono mientras hacíamos el registro juntos. Ahora entiendo mejor de qué hablan en las noticias.',
              perfil: 'Conservador'
            },
            {
              nombre: 'Valentina, 17 años',
              texto: 'Uso el historial para ver todas mis operaciones y entender en qué estuve gastando mi saldo virtual cada mes.',
              perfil: 'Moderado'
            },
            {
              nombre: 'Bruno, 13 años',
              texto: 'Recién empecé. Todavía estoy leyendo la sección de educación financiera antes de animarme a comprar algo.',
              perfil: 'Conservador'
            }
          ].map((caso, index) => (
            <motion.div
              key={caso.nombre}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
            >
              <p className="text-sm text-slate-300 leading-relaxed mb-4">"{caso.texto}"</p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{caso.nombre}</p>
                <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded-full">
                  {caso.perfil}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-500 mt-8">
          * Casos de uso ilustrativos
        </p>
      </div>

      {/* CTA final */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-cyan-500/10 blur-3xl rounded-full" />

          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
            Empezá a invertir hoy
          </h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto relative z-10">
            Sin riesgo, sin dinero real, con todo lo que necesitás para aprender de verdad.
          </p>
          <Link
            to="/registro"
            className="inline-block bg-cyan-500 text-slate-950 px-10 py-4 rounded-xl font-semibold hover:bg-cyan-400 transition-all hover:scale-105 relative z-10"
          >
            Crear cuenta gratis
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-4 gap-8 mb-12">
            <div>
              <p className="text-lg font-bold mb-3">
                Next<span className="text-cyan-400">Vest</span>
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
                Broker digital educativo para menores de 13 a 17 años, en el marco
                de la RG CNV 1091/2025.
              </p>
            </div>

            <div>
              <p className="text-sm font-medium mb-4">Producto</p>
              <div className="flex flex-col gap-2">
                <Link to="/educacion" className="text-sm text-slate-500 hover:text-white transition-colors">
                  Educación financiera
                </Link>
                <Link to="/registro" className="text-sm text-slate-500 hover:text-white transition-colors">
                  Crear cuenta
                </Link>
                <Link to="/login" className="text-sm text-slate-500 hover:text-white transition-colors">
                  Iniciar sesión
                </Link>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-4">Compañía</p>
              <div className="flex flex-col gap-2">
                <Link to="/quienes-somos" className="text-sm text-slate-500 hover:text-white transition-colors">
                  Quiénes somos
                </Link>
                <Link to="/admin/login" className="text-sm text-slate-500 hover:text-white transition-colors">
                  Panel administrativo
                </Link>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-4">Marco normativo</p>
              <p className="text-sm text-slate-500 leading-relaxed">
                Regulado bajo RG CNV 1091/2025. No opera con dinero real,
                criptomonedas ni instrumentos para inversores calificados.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800/50 pt-8 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              NextVest © 2026 · Broker digital educativo
            </p>
            <p className="text-xs text-slate-500">
              Proyecto académico — Comisión ACT5AP
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Inicio