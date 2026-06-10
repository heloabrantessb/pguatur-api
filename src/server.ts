import 'dotenv/config'
import { app } from './app'

const PORT = Number(process.env.PORT || 3000)

const start = async () => {
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' })
    app.log.info(`servidor rodando na porta ${PORT}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()