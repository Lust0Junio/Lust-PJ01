import { Request, Response, NextFunction } from 'express'
import { validateSession } from '../../lib/auth.js'

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string
    email: string
    firstName: string
    lastName: string
  }
}

export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'Access token required' 
    })
  }

  try {
    const session = await validateSession(token)
    
    if (!session) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid or expired token' 
      })
    }

    req.user = {
      id: session.user.id,
      email: session.user.email,
      firstName: session.user.firstName,
      lastName: session.user.lastName
    }

    next()
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      error: 'Invalid token' 
    })
  }
}