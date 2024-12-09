import { prismaClient } from './prisma-client'

export class UsersPrismaRepository {
  async getUserByEmail(email: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        email
      }
    })

    return user
  }
}
