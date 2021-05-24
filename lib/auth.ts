import Iron, { Password, defaults } from '@hapi/iron'
import { MAX_AGE, setTokenCookie, getTokenCookie } from './authCookies'

const TOKEN_SECRET: Password = process.env.TOKEN_SECRET || ''

export async function setLoginSession (res: any, session: any) {
  const createdAt = Date.now()
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE }
  const token = await Iron.seal(obj, TOKEN_SECRET, defaults)

  setTokenCookie(res, token)
}

export async function getLoginSession (req: any) {
  const token = getTokenCookie(req)

  if (!token) return

  const session = await Iron.unseal(token, TOKEN_SECRET, defaults)
  const expiresAt = session.createdAt + session.maxAge * 1000

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error('Session expired')
  }

  return session
}
