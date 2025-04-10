/**
 * Decodes a JWT token and returns the payload
 * @param token The JWT token to decode
 * @returns The decoded payload or null if the token is invalid
 */
export const decodeToken = (token: string) => {
  try {
    // Split the token into header, payload, and signature
    const parts = token.split('.')
    if (parts.length !== 3) {
      return null
    }

    // Decode the payload (second part)
    const payload = JSON.parse(atob(parts[1]))
    return payload
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

/**
 * Gets the expiration date from a JWT token
 * @param token The JWT token
 * @returns The expiration date as a Date object or null if the token is invalid
 */
export const getTokenExpirationDate = (token: string): Date | null => {
  const payload = decodeToken(token)
  if (!payload || !payload.exp) {
    return null
  }
  // Convert the expiration timestamp (seconds since epoch) to a Date object
  return new Date(payload.exp * 1000)
}

/**
 * Formats a date as a readable string
 * @param date The date to format
 * @returns A formatted date string
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleString()
}
