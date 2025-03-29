import express, { json } from 'express'
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

export const createApp = ({ movieModel }) => {
  const app = express()
  app.use(json()) // Middleware para parsear el body a JSON
  app.use(corsMiddleware())
  app.disable('x-powered-by') // Deshabilitar la cabecera X-Powered-By: express

  app.use('/movies', createMovieRouter({ movieModel })) // Todos los recursos que sean MOVIES se identifica con /movies

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
  })
}
