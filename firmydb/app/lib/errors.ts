// Error handling utilities
export type ErrorType = 'validation' | 'auth' | 'network' | 'server' | 'unknown'

export interface AppError {
  type: ErrorType
  message: string
  code?: string
  details?: any
}

export function createError(type: ErrorType, message: string, code?: string, details?: any): AppError {
  return {
    type,
    message,
    code,
    details
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPassword(password: string): boolean {
  return password.length >= 6
}

export function isValidSearchQuery(query: string): boolean {
  return query.trim().length > 0 && query.trim().length <= 255
}

export function formatErrorMessage(error: any): string {
  if (error && typeof error === 'object' && 'type' in error) {
    const appError = error as AppError
    switch (appError.type) {
      case 'validation':
        return `⚠️ ${appError.message}`
      case 'auth':
        return `🔐 ${appError.message}`
      case 'network':
        return `🌐 ${appError.message}. Zkontrolujte internetové připojení.`
      case 'server':
        return `⚠️ Chyba serveru: ${appError.message}`
      default:
        return `❌ ${appError.message}`
    }
  }

  if (error instanceof Error) {
    return `❌ ${error.message}`
  }

  return '❌ Neznámá chyba. Zkuste to později.'
}

export function validateEmail(email: string): AppError | null {
  if (!email) {
    return createError('validation', 'Email je povinný')
  }
  if (!isValidEmail(email)) {
    return createError('validation', 'Neplatná emailová adresa')
  }
  return null
}

export function validatePassword(password: string): AppError | null {
  if (!password) {
    return createError('validation', 'Heslo je povinné')
  }
  if (!isValidPassword(password)) {
    return createError('validation', 'Heslo musí mít alespoň 6 znaků')
  }
  return null
}

export function validateSearchQuery(query: string): AppError | null {
  if (query && !isValidSearchQuery(query)) {
    return createError('validation', 'Vyhledávací dotaz je příliš dlouhý')
  }
  return null
}
