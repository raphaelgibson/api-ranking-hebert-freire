import cors from '@fastify/cors'
import Fastify from 'fastify'
import { prismaClient } from './repositories/prisma-client'
import { authRoutes, musicsRoutes, praisesRoutes } from './routes'

const fastify = Fastify({ logger: true })

fastify.register(cors, { origin: process.env.FRONTEND_URL })
fastify.register(authRoutes)
fastify.register(praisesRoutes)
fastify.register(musicsRoutes)

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
    console.log('Servidor rodando em http://0.0.0.0:3000')
    const email = process.env.EMAIL as string
    const password = process.env.HASHED_PASSWORD as string

    if (!email || !password) {
      throw new Error('Invalid environment variables. (needs email and password)')
    }

    await prismaClient.user.create({
      data: {
        email,
        name: 'Hebert Freire',
        password,
        admin: true
      }
    })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
