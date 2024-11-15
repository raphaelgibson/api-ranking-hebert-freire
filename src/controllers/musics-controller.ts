import type { FastifyReply, FastifyRequest } from 'fastify'
import { MusicsPrismaRepository } from '../repositories'

export class MusicsController {
  private musicsRepository: MusicsPrismaRepository

  constructor() {
    this.musicsRepository = new MusicsPrismaRepository()
  }

  async getMusics(req: FastifyRequest, res: FastifyReply) {
    const musics = await this.musicsRepository.getMusics()

    return res.send(musics)
  }

  async createMusic(req: FastifyRequest, res: FastifyReply) {
    const { name, singer } = req.body as { name: string; singer: string }
    const music = await this.musicsRepository.createMusic(name, singer)

    return res.status(201).send(music)
  }

  async voteForMusic(req: FastifyRequest, res: FastifyReply) {
    const { musicId } = req.params as { musicId: string }
    const music = await this.musicsRepository.getMusicById(musicId)

    if (!music) {
      return res.status(404).send({ erro: 'Música não encontrada. Não foi possível votar.' })
    }

    const musicVotes = music.votes + 1
    await this.musicsRepository.updateMusicVotes(musicId, musicVotes)

    return res.status(204).send()
  }
}
