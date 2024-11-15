import type { FastifyInstance } from 'fastify'
import { PraisesController } from '../controllers'

export async function praisesRoutes(fastify: FastifyInstance) {
  fastify.get('/api/praises', async (req, res) => await new PraisesController().getPraises(req, res))
  fastify.post('/api/praises', async (req, res) => await new PraisesController().createPraise(req, res))
  fastify.put('/api/praises/:praiseId/vote', async (req, res) => await new PraisesController().voteForPraise(req, res))
}
