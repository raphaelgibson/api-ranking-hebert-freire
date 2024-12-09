import type { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import { prismaClient } from '../repositories/prisma-client'

export async function adminAuthMiddleware(req: FastifyRequest, res: FastifyReply, done: () => void) {
  const accessToken = req.headers['x-access-token'] as string
  const secretKey = process.env.SECRET_KEY || ''
  const tokenDecoded = jwt.verify(accessToken, secretKey) as { accountId: string }

  const user = await prismaClient.user.findUnique({
    where: {
      id: tokenDecoded.accountId
    }
  })

  if (!user) {
    return res.status(401).send({ error: 'Unauthorized' })
  }

  if (!user.admin) {
    return res.status(403).send({ error: 'Forbidden' })
  }

  done()
}