import jwt from 'jsonwebtoken'

function generateJWT({ id, email }) {
  const user = { id, email }
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '10m',
  })
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  })
  return { accessToken, refreshToken }
}

export default generateJWT
