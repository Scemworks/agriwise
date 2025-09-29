import { NextRequest } from 'next/server'

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: Record<string, any>
  userId?: string
  requestId?: string
  ip?: string
  userAgent?: string
  url?: string
  method?: string
}

class Logger {
  private logLevel: LogLevel

  constructor() {
    this.logLevel = (process.env.LOG_LEVEL as LogLevel) || LogLevel.INFO
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.ERROR, LogLevel.WARN, LogLevel.INFO, LogLevel.DEBUG]
    const currentLevelIndex = levels.indexOf(this.logLevel)
    const messageLevelIndex = levels.indexOf(level)
    return messageLevelIndex <= currentLevelIndex
  }

  private formatLog(entry: LogEntry): string {
    const { timestamp, level, message, context, userId, requestId, ip, userAgent, url, method } = entry
    
    let logString = `[${timestamp}] ${level.toUpperCase()}: ${message}`
    
    if (userId) logString += ` | User: ${userId}`
    if (requestId) logString += ` | Request: ${requestId}`
    if (ip) logString += ` | IP: ${ip}`
    if (method && url) logString += ` | ${method} ${url}`
    if (userAgent) logString += ` | UA: ${userAgent.substring(0, 100)}`
    if (context && Object.keys(context).length > 0) {
      logString += ` | Context: ${JSON.stringify(context)}`
    }
    
    return logString
  }

  private writeLog(entry: LogEntry): void {
    if (!this.shouldLog(entry.level)) return

    const formattedLog = this.formatLog(entry)
    
    // In production, you might want to send logs to a service like Sentry, DataDog, etc.
    if (process.env.NODE_ENV === 'production') {
      // Send to external logging service
      this.sendToExternalService(entry)
    } else {
      // Console logging for development
      switch (entry.level) {
        case LogLevel.ERROR:
          console.error(formattedLog)
          break
        case LogLevel.WARN:
          console.warn(formattedLog)
          break
        case LogLevel.INFO:
          console.info(formattedLog)
          break
        case LogLevel.DEBUG:
          console.debug(formattedLog)
          break
      }
    }
  }

  private sendToExternalService(entry: LogEntry): void {
    // Implement external logging service integration
    // For example, Sentry, DataDog, CloudWatch, etc.
    if (process.env.SENTRY_DSN) {
      // Sentry integration would go here
    }
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: Record<string, any>,
    request?: NextRequest
  ): LogEntry {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
    }

    if (request) {
      entry.requestId = request.headers.get('x-request-id') || undefined
      entry.ip = this.getClientIP(request)
      entry.userAgent = request.headers.get('user-agent') || undefined
      entry.url = request.url
      entry.method = request.method
    }

    return entry
  }

  private getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    
    if (forwarded) {
      return forwarded.split(',')[0].trim()
    }
    
    if (realIP) {
      return realIP
    }
    
    return 'unknown'
  }

  error(message: string, context?: Record<string, any>, request?: NextRequest): void {
    this.writeLog(this.createLogEntry(LogLevel.ERROR, message, context, request))
  }

  warn(message: string, context?: Record<string, any>, request?: NextRequest): void {
    this.writeLog(this.createLogEntry(LogLevel.WARN, message, context, request))
  }

  info(message: string, context?: Record<string, any>, request?: NextRequest): void {
    this.writeLog(this.createLogEntry(LogLevel.INFO, message, context, request))
  }

  debug(message: string, context?: Record<string, any>, request?: NextRequest): void {
    this.writeLog(this.createLogEntry(LogLevel.DEBUG, message, context, request))
  }

  // Specialized logging methods
  auth(message: string, userId?: string, context?: Record<string, any>, request?: NextRequest): void {
    this.info(`[AUTH] ${message}`, { ...context, userId }, request)
  }

  api(message: string, endpoint: string, context?: Record<string, any>, request?: NextRequest): void {
    this.info(`[API] ${message}`, { ...context, endpoint }, request)
  }

  security(message: string, context?: Record<string, any>, request?: NextRequest): void {
    this.warn(`[SECURITY] ${message}`, context, request)
  }

  database(message: string, operation: string, context?: Record<string, any>, request?: NextRequest): void {
    this.info(`[DATABASE] ${message}`, { ...context, operation }, request)
  }

  weather(message: string, location?: string, context?: Record<string, any>, request?: NextRequest): void {
    this.info(`[WEATHER] ${message}`, { ...context, location }, request)
  }

  ai(message: string, model?: string, context?: Record<string, any>, request?: NextRequest): void {
    this.info(`[AI] ${message}`, { ...context, model }, request)
  }
}

// Export singleton instance
export const logger = new Logger()

// Export convenience functions
export const logError = (message: string, context?: Record<string, any>, request?: NextRequest) => 
  logger.error(message, context, request)

export const logWarn = (message: string, context?: Record<string, any>, request?: NextRequest) => 
  logger.warn(message, context, request)

export const logInfo = (message: string, context?: Record<string, any>, request?: NextRequest) => 
  logger.info(message, context, request)

export const logDebug = (message: string, context?: Record<string, any>, request?: NextRequest) => 
  logger.debug(message, context, request)

export const logAuth = (message: string, userId?: string, context?: Record<string, any>, request?: NextRequest) => 
  logger.auth(message, userId, context, request)

export const logAPI = (message: string, endpoint: string, context?: Record<string, any>, request?: NextRequest) => 
  logger.api(message, endpoint, context, request)

export const logSecurity = (message: string, context?: Record<string, any>, request?: NextRequest) => 
  logger.security(message, context, request)

export const logDatabase = (message: string, operation: string, context?: Record<string, any>, request?: NextRequest) => 
  logger.database(message, operation, context, request)

export const logWeather = (message: string, location?: string, context?: Record<string, any>, request?: NextRequest) => 
  logger.weather(message, location, context, request)

export const logAI = (message: string, model?: string, context?: Record<string, any>, request?: NextRequest) => 
  logger.ai(message, model, context, request)

