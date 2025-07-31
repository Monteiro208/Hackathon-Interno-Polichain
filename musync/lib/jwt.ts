import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'development-secret'

export function gerarToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

export function verificarToken(token: string) {
  try {
    return jwt.verify(token, SECRET)
  } catch (err) {
    return null
  }
}
