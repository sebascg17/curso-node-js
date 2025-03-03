import os from 'node:os'
// import { platform, release, arch, cpus, freemem, totalmem, uptime } from 'node:os';

console.log('Nombre del sistema operativo', os.platform())
console.log('Version del sistema operativo', os.release())
console.log('Arquitectura', os.arch())
console.log('CPUs', os.cpus())
console.log('Memoria libre', os.freemem() / 1024 / 1024)
console.log('Memoria total', os.totalmem() / 1024 / 1024)
console.log('Uptime', os.uptime() / 60 / 60)
