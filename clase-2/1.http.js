const http = require('node:http') // Protocolo de transferencia de hipertexto HTTP
const fs = require('node:fs') // Sistema de archivos

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (req.url === '/') {
    res.statusCode = 200 // OK
    res.end('<h1>Mi página</h1>')
  } else if (req.url === '/imagen-x.png') {
    fs.readFile('./imagen-x.png', (err, data) => {
      if (err) {
        res.statusCode = 500 // Internal Server Error
        res.end('<h1>500 Internal server error</h1>')
      } else {
        res.statusCode = 200 // OK
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200 // OK
    res.end('<h1>Contacto</h1>')
  } else {
    res.statusCode = 404 // Not Found
    res.end('<h1>Error 404</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`Server listening on port http://localhost:${desiredPort}`)
})
