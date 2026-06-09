import fastify from 'fastify'

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

export { app }
