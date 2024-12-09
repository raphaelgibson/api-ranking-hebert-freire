import type { FastifyInstance } from 'fastify'
import { AuthController } from '../controllers/auth-controller'

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/api/login', async (req, res) => await new AuthController().auth(req, res))
}
