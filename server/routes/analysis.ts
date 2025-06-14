import express from 'express'
import { prisma } from '../../lib/prisma.js'
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js'

const router = express.Router()

// Create analysis
router.post('/', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { spreadsheetId, name, description, selectedColumns, dateColumn, periodType } = req.body

    // Validate spreadsheet ownership
    const spreadsheet = await prisma.spreadsheet.findFirst({
      where: {
        id: spreadsheetId,
        userId: req.user!.id
      }
    })

    if (!spreadsheet) {
      return res.status(404).json({
        success: false,
        error: 'Spreadsheet not found'
      })
    }

    // Create analysis
    const analysis = await prisma.analysis.create({
      data: {
        userId: req.user!.id,
        spreadsheetId,
        name,
        description,
        selectedColumns,
        dateColumn,
        periodType,
        status: 'PENDING'
      }
    })

    // TODO: Trigger async analysis processing
    // This would involve:
    // 1. Reading the spreadsheet data
    // 2. Running AI analysis algorithms
    // 3. Generating insights, trends, and anomalies
    // 4. Updating the analysis record with results

    res.status(201).json({
      success: true,
      data: analysis,
      message: 'Analysis created successfully'
    })
  } catch (error) {
    console.error('Create analysis error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to create analysis'
    })
  }
})

// Get user's analyses
router.get('/', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const [analyses, total] = await Promise.all([
      prisma.analysis.findMany({
        where: { userId: req.user!.id },
        include: {
          spreadsheet: {
            select: {
              originalName: true,
              fileSize: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.analysis.count({
        where: { userId: req.user!.id }
      })
    ])

    res.json({
      success: true,
      data: analyses,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Get analyses error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get analyses'
    })
  }
})

// Get analysis by ID
router.get('/:id', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const analysis = await prisma.analysis.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id
      },
      include: {
        spreadsheet: {
          select: {
            originalName: true,
            fileName: true,
            fileSize: true,
            totalRows: true,
            totalColumns: true
          }
        }
      }
    })

    if (!analysis) {
      return res.status(404).json({
        success: false,
        error: 'Analysis not found'
      })
    }

    res.json({
      success: true,
      data: analysis
    })
  } catch (error) {
    console.error('Get analysis error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get analysis'
    })
  }
})

// Update analysis
router.put('/:id', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { name, description, selectedColumns, dateColumn, periodType } = req.body

    const analysis = await prisma.analysis.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id
      }
    })

    if (!analysis) {
      return res.status(404).json({
        success: false,
        error: 'Analysis not found'
      })
    }

    const updatedAnalysis = await prisma.analysis.update({
      where: { id: req.params.id },
      data: {
        name,
        description,
        selectedColumns,
        dateColumn,
        periodType
      }
    })

    res.json({
      success: true,
      data: updatedAnalysis,
      message: 'Analysis updated successfully'
    })
  } catch (error) {
    console.error('Update analysis error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to update analysis'
    })
  }
})

// Delete analysis
router.delete('/:id', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const analysis = await prisma.analysis.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id
      }
    })

    if (!analysis) {
      return res.status(404).json({
        success: false,
        error: 'Analysis not found'
      })
    }

    await prisma.analysis.delete({
      where: { id: req.params.id }
    })

    res.json({
      success: true,
      message: 'Analysis deleted successfully'
    })
  } catch (error) {
    console.error('Delete analysis error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to delete analysis'
    })
  }
})

export default router