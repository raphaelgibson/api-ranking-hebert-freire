import { prismaClient } from './prisma-client'

export class MusicsPrismaRepository {
  async getMusicById(musicId: string) {
    const music = await prismaClient.music.findUnique({
      where: {
        id: musicId
      }
    })
    return music
  }

  async getMusics() {
    const musics = await prismaClient.music.findMany({
      orderBy: [
        {
          votes: 'desc'
        },
        {
          name: 'asc'
        }
      ]
    })
    return musics
  }

  async createMusic(name: string, singer: string) {
    const music = await prismaClient.music.create({
      data: {
        singer,
        name
      }
    })

    return music
  }

  async updateMusicVotes(musicId: string, votes: number) {
    await prismaClient.music.update({
      data: {
        votes
      },
      where: {
        id: musicId
      }
    })
  }
}
