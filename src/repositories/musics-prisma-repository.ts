import { prismaClient } from './prisma-client'

type UpdateMusicData = {
  musicId: string
  name: string
  singer?: string
}

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

  async updateMusic(updateMusicData: UpdateMusicData) {
    const { musicId, name, singer } = updateMusicData
    await prismaClient.music.update({
      data: {
        name,
        singer
      },
      where: {
        id: musicId
      }
    })
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

  async deleteMusic(id: string) {
    await prismaClient.music.delete({
      where: {
        id
      }
    })
  }
}
