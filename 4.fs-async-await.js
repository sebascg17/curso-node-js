// Esto solo en los modulos nativos
// que no tienen promesas nativas

// const { promisify } = require('node:util');
// const readFilePromise = promisify(fs.readFile);

const fs = require('node:fs/promises')

// IIFE - Immediately Invoked Function Expression
;(
    async () => {
        console.log('Leyendo el primer archivo...');
        const text = await fs.readFile('./archivo.txt', 'utf-8')
        console.log('primer texto:',text);

        console.log('-->Hacer cosas mientras lee el archivo...');

        console.log('Leyendo el segundo archivo...');   
        const text2 = await fs.readFile('./archivo2.txt', 'utf-8')
        console.log('segundo texto:',text2);
    }
)
