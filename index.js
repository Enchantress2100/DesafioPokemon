const axios = require('axios')
const url = require('url')
const fs = require('fs')
const http = require('http')

http.createServer((req, res) => {
    //leer el HTML
    if (req.url == '/') {
        res.writeHead(200, { 'Content-type': 'text/html' })
        fs.readFile('index.html', 'utf-8', (err, html) => {
            res.end(html)
        })
    }
   //creacion de array para guardar informacion
    let pokeData = []

    //funcion asincrona para traer la data de la api, en especifico, nombre y url de los pokemon con axios
    const pokemonesInfo = async () => {
        try {
            const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon-form?offset=0&limit=150')
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    //insertar informacion en el array Pokedata
    // pokemonesInfo().then((data) => {
    //     data.forEach((p) => {
    //         let pokemonName = p.nombre
    //         pokeData.push(getPicture())//avanza cuando la siguiente funcion este lista
    //     })
    // })

    //funcion asincrona para extraer la imagen
    const getPicture = async (nombre) => {
        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon-form?offset=0&limit=150/s`)
            console.log(data.sprites.default)
        } catch (error) {
            console.log(error)
        }     
    }
    getPicture()


    
}).listen(3000,()=>console.log('Servidor ON y funcionando OK'))