import fastify from 'fastify'
import categoriasRoutes from './modules/categorias/categorias.routes.js'

const app = fastify({
  logger: true,
})

// Rota de Health Check
app.get('/health', async () => {
  return { status: 'ok', timestamp: new Date() }
})

app.get('/', async () => {
  return { message: 'Bem-vindo ao PGuaTur API' }
})

app.register(categoriasRoutes, { prefix: '/categorias' })

export { app }
