// Utility functions for fetch operations with retry logic and validation

/**
 * Validates that required environment variables are set
 * @throws Error if validation fails
 */
export function validateStoryblokEnv(): string {
  const token = process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN

  if (!token) {
    throw new Error(
      'Missing NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN environment variable. ' +
      'Please check your .env file.'
    )
  }

  return token
}

/**
 * Sleep utility for retry delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export interface RetryOptions {
  maxRetries?: number
  baseDelay?: number
  maxDelay?: number
  shouldRetry?: (error: Error, attempt: number) => boolean
}

/**
 * Default retry condition - retry on network errors and 5xx status codes
 */
function defaultShouldRetry(error: Error, attempt: number): boolean {
  // Don't retry on last attempt
  if (attempt >= 3) return false

  const message = error.message.toLowerCase()

  // Retry on network errors
  if (
    message.includes('fetch failed') ||
    message.includes('network') ||
    message.includes('econnrefused') ||
    message.includes('timeout')
  ) {
    return true
  }

  // Retry on 5xx errors (server errors)
  if (message.includes('(5')) {
    return true
  }

  // Retry on 429 (rate limit)
  if (message.includes('(429)')) {
    return true
  }

  return false
}

/**
 * Fetches with exponential backoff retry logic
 */
export async function fetchWithRetry<T>(
  url: string,
  options?: RequestInit,
  retryOptions?: RetryOptions
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    shouldRetry = defaultShouldRetry,
  } = retryOptions || {}

  let lastError: Error | null = null

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        const text = await response.text()
        const error = new Error(
          `HTTP ${response.status}: ${response.statusText}${text ? ` - ${text}` : ''}`
        )

        // Check if we should retry this error
        if (attempt < maxRetries - 1 && shouldRetry(error, attempt)) {
          lastError = error
          const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay)
          console.warn(
            `[fetchWithRetry] Attempt ${attempt + 1}/${maxRetries} failed: ${error.message}. ` +
            `Retrying in ${delay}ms...`
          )
          await sleep(delay)
          continue
        }

        throw error
      }

      return await response.json() as T
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))

      // Check if we should retry
      if (attempt < maxRetries - 1 && shouldRetry(err, attempt)) {
        lastError = err
        const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay)
        console.warn(
          `[fetchWithRetry] Attempt ${attempt + 1}/${maxRetries} failed: ${err.message}. ` +
          `Retrying in ${delay}ms...`
        )
        await sleep(delay)
        continue
      }

      throw err
    }
  }

  throw lastError || new Error('Fetch failed after retries')
}
