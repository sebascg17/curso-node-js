// const { cp } = require('node:fs')
const path = require('node:path')

// barra separadora de carpetas segun el sistema operativo
console.log(path.sep) // separador de rutas

// unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

const base = path.basename(filePath)
console.log(base)

const filename = path.basename(filePath, '.txt')
console.log(filename)

const extension = path.extname(filePath)
console.log(extension)
