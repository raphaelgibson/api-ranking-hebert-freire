import { prismaClient } from './prisma-client'

export class PraisesPrismaRepository {
  async getPraiseById(praiseId: string) {
    const praise = await prismaClient.praise.findUnique({
      where: {
        id: praiseId
      }
    })
    return praise
  }

  async getPraises() {
    const praises = await prismaClient.praise.findMany({
      orderBy: [
        {
          votes: 'desc'
        },
        {
          name: 'asc'
        }
      ]
    })
    return praises
  }

  async createPraise(name: string, singer: string) {
    const praise = await prismaClient.praise.create({
      data: {
        singer,
        name
      }
    })

    return praise
  }

  async updatePraiseVotes(praiseId: string, votes: number) {
    await prismaClient.praise.update({
      data: {
        votes
      },
      where: {
        id: praiseId
      }
    })
  }
}
