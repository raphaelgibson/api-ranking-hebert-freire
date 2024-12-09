import { prismaClient } from './prisma-client'

type UpdatePraiseData = {
  praiseId: string
  name: string
  singer?: string
}

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

  async updatePraise(updatePraiseData: UpdatePraiseData) {
    const { praiseId, name, singer } = updatePraiseData
    await prismaClient.praise.update({
      data: {
        name,
        singer
      },
      where: {
        id: praiseId
      }
    })
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

  async deletePraise(id: string) {
    await prismaClient.praise.delete({
      where: {
        id
      }
    })
  }
}
