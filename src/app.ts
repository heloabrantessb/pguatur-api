import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import categoriasRoutes from './modules/categorias/categorias.routes'
import authRoutes from './modules/auth/auth.routes'

const app = fastify({
  logger: true,
})



// JWT
app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'supersecretkey',
})

app.decorate('authenticate', async (request: any, reply: any) => {
  try {
    await request.jwtVerify()
  } catch (err) {
    return reply.status(401).send({ error: 'Token inválido ou ausente' })
  }
})

app.register(categoriasRoutes, { prefix: '/categorias' })
app.register(authRoutes, { prefix: '/auth' })

// Rota de Health Check
app.get('/health', async () => {
  return { status: 'ok', timestamp: new Date() }
})

export { app }
