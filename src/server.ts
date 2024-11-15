import cors from '@fastify/cors'
import Fastify from 'fastify'
import { musicsRoutes, praisesRoutes } from './routes'

const fastify = Fastify({ logger: true })

fastify.register(cors, { origin: process.env.FRONTEND_URL })
fastify.register(praisesRoutes)
fastify.register(musicsRoutes)

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
    console.log('Servidor rodando em http://localhost:3000')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
