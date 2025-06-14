import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key'

export interface JWTPayload {
  userId: string
  email: string
}

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 12)
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword)
}

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, JWT_SECRET) as JWTPayload
}

export const createSession = async (userId: string, token: string, userAgent?: string, ipAddress?: string) => {
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7) // 7 days

  return prisma.session.create({
    data: {
      userId,
      token,
      userAgent,
      ipAddress,
      expiresAt
    }
  })
}

export const validateSession = async (token: string) => {
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true }
  })

  if (!session || session.expiresAt < new Date()) {
    return null
  }

  return session
}

export const revokeSession = async (token: string) => {
  return prisma.session.delete({
    where: { token }
  })
}