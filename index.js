import 'dotenv/config'
import express, { json } from 'express'
import cors from 'cors'
import { handleErrors } from './app/middlewares/index.middleware.js'
import router from './app/routers/index.router.js'
import debugLogger from './app/utils/debugLogger.util.js'

const app = express()
const PORT = process.env.PORT
const HOST = process.env.HOST

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    const allowedOrigins = ['http://127.0.0.1:5173', 'http://localhost:5173', 'http://127.0.0.1:5174', 'http://localhost:5174']
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    }
    else {
      callback(new Error(`The client origin is not included in the CORS options' allowed origins.`))
    }
  },
  allowedHeaders: ['Content-Type', 'authorization', 'x-refresh-token'],
}

const logger = debugLogger('index.js')

app.use(cors(corsOptions))
app.use(json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

/* The error handler is placed after all routes to make sure all errors are handled. */
app.use(handleErrors)

const server = app.listen({ port: PORT, host: HOST }, () => {
  logger(
    `The back-end server was successfully started on host ${HOST} on port ${PORT}.`,
  )
})

server.on('error', (error) => {
  logger(
    `The back-end server could not be started on port:${PORT}. The following error was returned. ${error.message}`,
  )
})
