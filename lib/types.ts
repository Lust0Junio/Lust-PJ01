export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  emailVerified: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Spreadsheet {
  id: string
  userId: string
  originalName: string
  fileName: string
  filePath: string
  fileSize: number
  mimeType: string
  totalRows?: number
  totalColumns?: number
  sheetNames: string[]
  hasHeaders: boolean
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  errorMessage?: string
  createdAt: Date
  updatedAt: Date
}

export interface Analysis {
  id: string
  userId: string
  spreadsheetId: string
  name: string
  description?: string
  selectedColumns: string[]
  dateColumn?: string
  periodType?: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY'
  kpis?: any
  trends?: any
  anomalies?: any
  insights?: any
  statistics?: any
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  processingTime?: number
  errorMessage?: string
  createdAt: Date
  updatedAt: Date
}

export interface Report {
  id: string
  userId: string
  analysisId?: string
  spreadsheetId?: string
  title: string
  description?: string
  template: 'EXECUTIVE' | 'DETAILED' | 'SUMMARY' | 'CUSTOM'
  includeCharts: boolean
  includeInsights: boolean
  includeKpis: boolean
  executiveSummary?: string
  keyInsights?: any
  recommendations?: any
  chartSuggestions?: any
  narrative?: string
  wordCount?: number
  pageCount?: number
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  generationTime?: number
  errorMessage?: string
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}