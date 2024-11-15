import type { FastifyReply, FastifyRequest } from 'fastify'
import { PraisesPrismaRepository } from '../repositories'

export class PraisesController {
  private praisesRepository: PraisesPrismaRepository

  constructor() {
    this.praisesRepository = new PraisesPrismaRepository()
  }

  async getPraises(req: FastifyRequest, res: FastifyReply) {
    const praises = await this.praisesRepository.getPraises()

    return res.send(praises)
  }

  async createPraise(req: FastifyRequest, res: FastifyReply) {
    const { name, singer } = req.body as { name: string; singer: string }
    const praise = await this.praisesRepository.createPraise(name, singer)

    return res.status(201).send(praise)
  }

  async voteForPraise(req: FastifyRequest, res: FastifyReply) {
    const { praiseId } = req.params as { praiseId: string }
    const praise = await this.praisesRepository.getPraiseById(praiseId)

    if (!praise) {
      return res.status(404).send({ erro: 'Louvor não encontrado. Não foi possível votar.' })
    }

    const praiseVotes = praise.votes + 1
    await this.praisesRepository.updatePraiseVotes(praiseId, praiseVotes)

    return res.status(204).send()
  }
}
