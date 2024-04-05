import 'dotenv/config'
import jwt from 'jsonwebtoken'
import generateJWT from '../utils/generateJWT.util.js'

async function verifyToken(token, secret) {
  const decoded = await jwt.verify(token, secret)
  return decoded
}

async function checkForValidAuthentification(req, res, next) {
  let accessToken, refreshToken
  try {
    accessToken = req.headers['authorization'].split(' ')[1]
    refreshToken = req.headers['x-refresh-token']
  }
  catch {
    if (!accessToken) {
      return res.status(403).json({
        error:
           `No access token was provided to the server: please make sure you are logged in.`,
      })
    }
    else if (!refreshToken) {
      return res.status(403).json({
        error:
           `No refresh token was provided to the server: please make sure you are logged in.`,
      })
    }
  }

  try {
    // We check that the provided access token matches the one generated at the time of login...
    await verifyToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
    )
    next()
  }
  catch {
    // If the access token is not recognized as being the one known to the server, we check if there is a refresh token...
    if (refreshToken) {
      try {
        // We check that the provided refresh token matches the one generated at the time of login...
        const decoded = await verifyToken(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
        )
        // If the refresh token is valid, we regenerate both access & refresh tokens
        const { accessToken: newAccessToken, refreshToken: newRefreshToken }
          = generateJWT(decoded)
        // We set both tokens in the authorization header...
        res.setHeader(
          'authorization',
          `Bearer ${newAccessToken}`,
        )
        res.setHeader('x-refresh-token', newRefreshToken)
        next()
      }
      catch {
        return res.status(500).json({
          error:
            'The refresh token provided is invalid. Please log back into your account',
        })
      }
    }
    else {
      return res.status(500).json({
        error:
          'The token provided is invalid. Please log back into your account',
      })
    }
  }
}

export default checkForValidAuthentification
