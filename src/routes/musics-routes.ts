import type { FastifyInstance } from 'fastify'
import { MusicsController } from '../controllers'

export async function musicsRoutes(fastify: FastifyInstance) {
  fastify.get('/api/musics', async (req, res) => await new MusicsController().getMusics(req, res))
  fastify.post('/api/musics', async (req, res) => await new MusicsController().createMusic(req, res))
  fastify.put('/api/musics/:musicId/vote', async (req, res) => await new MusicsController().voteForMusic(req, res))
}
