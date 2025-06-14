import express from 'express'
import { prisma } from '../../lib/prisma.js'
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js'

const router = express.Router()

// Create report
router.post('/', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { 
      analysisId, 
      spreadsheetId, 
      title, 
      description, 
      template, 
      includeCharts, 
      includeInsights, 
      includeKpis 
    } = req.body

    // Validate analysis or spreadsheet ownership
    if (analysisId) {
      const analysis = await prisma.analysis.findFirst({
        where: {
          id: analysisId,
          userId: req.user!.id
        }
      })

      if (!analysis) {
        return res.status(404).json({
          success: false,
          error: 'Analysis not found'
        })
      }
    }

    if (spreadsheetId) {
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
    }

    // Create report
    const report = await prisma.report.create({
      data: {
        userId: req.user!.id,
        analysisId,
        spreadsheetId,
        title,
        description,
        template: template || 'EXECUTIVE',
        includeCharts: includeCharts !== false,
        includeInsights: includeInsights !== false,
        includeKpis: includeKpis !== false,
        status: 'PENDING'
      }
    })

    // TODO: Trigger async report generation
    // This would involve:
    // 1. Gathering data from analysis or spreadsheet
    // 2. Running AI report generation algorithms
    // 3. Creating executive summary, insights, recommendations
    // 4. Updating the report record with generated content

    res.status(201).json({
      success: true,
      data: report,
      message: 'Report creation started'
    })
  } catch (error) {
    console.error('Create report error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to create report'
    })
  }
})

// Get user's reports
router.get('/', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where: { userId: req.user!.id },
        include: {
          analysis: {
            select: {
              name: true,
              spreadsheet: {
                select: {
                  originalName: true
                }
              }
            }
          },
          spreadsheet: {
            select: {
              originalName: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.report.count({
        where: { userId: req.user!.id }
      })
    ])

    res.json({
      success: true,
      data: reports,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Get reports error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get reports'
    })
  }
})

// Get report by ID
router.get('/:id', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const report = await prisma.report.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id
      },
      include: {
        analysis: {
          include: {
            spreadsheet: {
              select: {
                originalName: true,
                fileName: true
              }
            }
          }
        },
        spreadsheet: {
          select: {
            originalName: true,
            fileName: true
          }
        },
        exports: true
      }
    })

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      })
    }

    res.json({
      success: true,
      data: report
    })
  } catch (error) {
    console.error('Get report error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get report'
    })
  }
})

// Export report
router.post('/:id/export', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { format } = req.body

    if (!['PDF', 'PPTX', 'DOCX', 'HTML'].includes(format)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid export format'
      })
    }

    const report = await prisma.report.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id
      }
    })

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      })
    }

    // Create export record
    const reportExport = await prisma.reportExport.create({
      data: {
        reportId: report.id,
        format,
        fileName: `${report.title}.${format.toLowerCase()}`,
        filePath: '', // Will be set after generation
        fileSize: 0,  // Will be set after generation
        status: 'PENDING'
      }
    })

    // TODO: Trigger async export generation
    // This would involve:
    // 1. Converting report content to requested format
    // 2. Saving file to filesystem
    // 3. Updating export record with file details

    res.status(201).json({
      success: true,
      data: reportExport,
      message: 'Export started'
    })
  } catch (error) {
    console.error('Export report error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to export report'
    })
  }
})

// Delete report
router.delete('/:id', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const report = await prisma.report.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id
      }
    })

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      })
    }

    await prisma.report.delete({
      where: { id: req.params.id }
    })

    res.json({
      success: true,
      message: 'Report deleted successfully'
    })
  } catch (error) {
    console.error('Delete report error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to delete report'
    })
  }
})

export default router