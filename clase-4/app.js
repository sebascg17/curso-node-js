import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

// Leer el archivo movies.json en ES Modules:
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

// Como leer el ES Modules de forma recomendada

const app = express()
app.use(json()) // Middleware para parsear el body a JSON
app.use(corsMiddleware)
app.disable('x-powered-by') // Deshabilitar la cabecera X-Powered-By: express
app.use('/movies', moviesRouter) // Todos los recursos que sean MOVIES se identifica con /movies

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
