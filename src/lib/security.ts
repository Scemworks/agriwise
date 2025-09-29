import { NextResponse } from 'next/server'
import { z } from 'zod'

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Input validation schemas
export const LoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const RegisterSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
  phone: z.string().optional(),
  // Location details
  state: z.string().optional(),
  city: z.string().optional(),
  pincode: z.string().optional(),
  address: z.string().optional(),
  // Farming details
  soilType: z.string().optional(),
  currentCrops: z.string().optional(),
  landSize: z.number().min(0, 'Land size must be positive').optional(),
  irrigation: z.boolean().optional(),
})

export const ProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(100, 'Name too long'),
  description: z.string().max(500, 'Description too long').optional(),
  price: z.number().positive('Price must be positive'),
  quantity: z.number().int().min(0, 'Quantity must be non-negative').default(1),
  categoryId: z.string().uuid('Invalid category ID').optional(),
  images: z.array(z.string().url('Invalid image URL')).max(5, 'Too many images').optional(),
})

export const WeatherQuerySchema = z.object({
  city: z.string().min(1, 'City name is required').max(100, 'City name too long').optional(),
  location: z.string().min(1, 'Location is required').max(100, 'Location too long').optional(),
  days: z.string().regex(/^[1-3]$/, 'Days must be 1, 2, or 3').optional(),
})

// Rate limiting
export function rateLimit(identifier: string, maxRequests = 100, windowMs = 15 * 60 * 1000) {
  const now = Date.now()
  const key = identifier
  const record = rateLimitStore.get(key)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return { success: true, remaining: maxRequests - 1 }
  }

  if (record.count >= maxRequests) {
    return { success: false, remaining: 0, resetTime: record.resetTime }
  }

  record.count++
  return { success: true, remaining: maxRequests - record.count }
}

// Input sanitization
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000) // Limit length
}

// SQL injection prevention
export function sanitizeForDatabase(input: string): string {
  return input
    .replace(/['"\\]/g, '') // Remove quotes and backslashes
    .replace(/[;--]/g, '') // Remove SQL comment markers
    .trim()
}

// XSS prevention
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// CSRF token generation
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Validate CSRF token
export function validateCSRFToken(token: string, sessionToken: string): boolean {
  return token === sessionToken && token.length > 0
}

// Security headers
export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  }
}

// Apply security headers to response
export function applySecurityHeaders(response: NextResponse): NextResponse {
  const headers = getSecurityHeaders()
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}

// IP address extraction
export function getClientIP(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const realIP = req.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return 'unknown'
}

// Request validation middleware
export function validateRequest<T>(schema: z.ZodSchema<T>) {
  return async (req: Request): Promise<{ success: true; data: T } | { success: false; error: NextResponse }> => {
    try {
      const body = await req.json()
      const validatedData = schema.parse(body)
      return { success: true, data: validatedData }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorResponse = NextResponse.json(
          { 
            error: 'Validation failed', 
            details: error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
          },
          { status: 400 }
        )
        return { success: false, error: errorResponse }
      }
      
      const errorResponse = NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
      return { success: false, error: errorResponse }
    }
  }
}

// Password strength validation
export function validatePasswordStrength(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  return { valid: errors.length === 0, errors }
}

// Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

// Clean up rate limit store periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000) // Clean up every 5 minutes
