import express from 'express'
import { prisma } from '../../lib/prisma.js'
import { hashPassword, comparePassword, generateToken, createSession, revokeSession } from '../../lib/auth.js'
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js'

const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        emailVerified: true,
        isActive: true,
        createdAt: true
      }
    })

    // Generate token and create session
    const token = generateToken({ userId: user.id, email: user.email })
    await createSession(user.id, token, req.headers['user-agent'], req.ip)

    res.status(201).json({
      success: true,
      data: {
        user,
        token
      },
      message: 'User registered successfully'
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({
      success: false,
      error: 'Registration failed'
    })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      })
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      })
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password)

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      })
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    })

    // Generate token and create session
    const token = generateToken({ userId: user.id, email: user.email })
    await createSession(user.id, token, req.headers['user-agent'], req.ip)

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          emailVerified: user.emailVerified,
          isActive: user.isActive,
          createdAt: user.createdAt
        },
        token
      },
      message: 'Login successful'
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      error: 'Login failed'
    })
  }
})

// Logout
router.post('/logout', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token) {
      await revokeSession(token)
    }

    res.json({
      success: true,
      message: 'Logout successful'
    })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({
      success: false,
      error: 'Logout failed'
    })
  }
})

// Get current user
router.get('/me', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        emailVerified: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    })

    res.json({
      success: true,
      data: user
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get user data'
    })
  }
})

export default router