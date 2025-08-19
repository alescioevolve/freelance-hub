// Simple in-memory rate limiter for demo purposes
const requests = new Map<string, { count: number; resetTime: number }>()

export function rateLimit(ip: string, limit = 100, windowMs: number = 15 * 60 * 1000): boolean {
  const now = Date.now()
  const key = ip

  const record = requests.get(key)

  if (!record || now > record.resetTime) {
    requests.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count++
  return true
}
