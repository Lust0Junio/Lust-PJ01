import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// Import routes
import authRoutes from './routes/auth.js'
import spreadsheetRoutes from './routes/spreadsheets.js'
import analysisRoutes from './routes/analysis.js'
import reportRoutes from './routes/reports.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/spreadsheets', spreadsheetRoutes)
app.use('/api/analysis', analysisRoutes)
app.use('/api/reports', reportRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Route not found' 
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 DataSight AI API ready`)
})