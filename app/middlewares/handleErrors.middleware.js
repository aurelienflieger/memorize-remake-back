import { fileURLToPath } from 'url'
import { basename } from 'path'
import debugLogger from '../utils/debugLogger.util.js'

const __fileName = basename(fileURLToPath(import.meta.url))
const logger = debugLogger(__fileName)

// The error handler automatically handles all Express errors and sends the appropriate status.
function handleErrors(error, _, res, next) {
  logger(`An error occured. 
  errorCode: ${error.errorCode} 
  details: ${error.details} 
  method: ${error.method} 
  path: ${error.path} `)

  res.status(error.httpStatus).json({ ...error })
  next()
}

export default handleErrors
