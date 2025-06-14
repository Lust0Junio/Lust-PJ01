import express from 'express'
import multer from 'multer'
import path from 'path'
import { prisma } from '../../lib/prisma.js'
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js'
import crypto from 'crypto'
import fs from 'fs'

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv'
    ]
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only Excel and CSV files are allowed.'))
    }
  }
})

// Upload spreadsheet
router.post('/upload', authenticateToken, upload.single('file'), async (req: AuthenticatedRequest, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      })
    }

    // Calculate file checksum
    const fileBuffer = fs.readFileSync(req.file.path)
    const checksum = crypto.createHash('md5').update(fileBuffer).digest('hex')

    // Create spreadsheet record
    const spreadsheet = await prisma.spreadsheet.create({
      data: {
        userId: req.user!.id,
        originalName: req.file.originalname,
        fileName: req.file.filename,
        filePath: req.file.path,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        checksum,
        sheetNames: [], // Will be populated during processing
        status: 'PENDING'
      }
    })

    // TODO: Trigger async processing of the file
    // This would typically involve:
    // 1. Reading the file content
    // 2. Extracting metadata (rows, columns, sheet names)
    // 3. Updating the spreadsheet record

    res.status(201).json({
      success: true,
      data: spreadsheet,
      message: 'File uploaded successfully'
    })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({
      success: false,
      error: 'File upload failed'
    })
  }
})

// Get user's spreadsheets
router.get('/', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const [spreadsheets, total] = await Promise.all([
      prisma.spreadsheet.findMany({
        where: { userId: req.user!.id },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          originalName: true,
          fileName: true,
          fileSize: true,
          mimeType: true,
          totalRows: true,
          totalColumns: true,
          sheetNames: true,
          hasHeaders: true,
          status: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.spreadsheet.count({
        where: { userId: req.user!.id }
      })
    ])

    res.json({
      success: true,
      data: spreadsheets,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Get spreadsheets error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get spreadsheets'
    })
  }
})

// Get spreadsheet by ID
router.get('/:id', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const spreadsheet = await prisma.spreadsheet.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id
      }
    })

    if (!spreadsheet) {
      return res.status(404).json({
        success: false,
        error: 'Spreadsheet not found'
      })
    }

    res.json({
      success: true,
      data: spreadsheet
    })
  } catch (error) {
    console.error('Get spreadsheet error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get spreadsheet'
    })
  }
})

// Delete spreadsheet
router.delete('/:id', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const spreadsheet = await prisma.spreadsheet.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id
      }
    })

    if (!spreadsheet) {
      return res.status(404).json({
        success: false,
        error: 'Spreadsheet not found'
      })
    }

    // Delete file from filesystem
    if (fs.existsSync(spreadsheet.filePath)) {
      fs.unlinkSync(spreadsheet.filePath)
    }

    // Delete from database
    await prisma.spreadsheet.delete({
      where: { id: req.params.id }
    })

    res.json({
      success: true,
      message: 'Spreadsheet deleted successfully'
    })
  } catch (error) {
    console.error('Delete spreadsheet error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to delete spreadsheet'
    })
  }
})

export default router