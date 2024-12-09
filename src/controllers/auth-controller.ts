import type { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import { verifyPassword } from '../libs/bcrypt'
import { UsersPrismaRepository } from '../repositories'

export class AuthController {
  private usersRepository: UsersPrismaRepository
  private secretKey: string

  constructor() {
    this.secretKey = process.env.SECRET_KEY || ''
    this.usersRepository = new UsersPrismaRepository()
  }

  async auth(req: FastifyRequest, res: FastifyReply) {
    const { email, password } = req.body as { email: string; password: string }
    const user = await this.usersRepository.getUserByEmail(email)

    if (!user) {
      return res.status(401).send({ error: 'Unauthorized' })
    }

    const passwordIsValid = verifyPassword(password, user.password)

    if (!passwordIsValid) {
      return res.status(401).send({ error: 'Unauthorized' })
    }

    const accessToken = jwt.sign({ accountId: user.id }, this.secretKey, {
      expiresIn: process.env?.TOKEN_EXPIRATION_IN_DAYS || '1d'
    })

    return res.send({ accessToken })
  }
}
