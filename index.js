const axios = require('axios')
const url = require('url')
const fs = require('fs')
const http = require('http')

//funcion asincrona para traer la data de la api, en especifico, nombre y url de los pokemon con axios
    const pokemonesInfo = async () => {
        try {
            const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon-form?offset=0&limit=150')
            //console.log(data.results)
            return data.results
        } catch (error) {
            console.log(error)
        }
    }

//funcion asincrona para extraer la imagen
    const getPicture = async (nombre) => {
        try {
            const imagen = await axios.get(`https://pokeapi.co/api/v2/pokemon-form/${nombre}`)
            const img=imagen.data.sprites.front_default
            return img
        } catch (error) {
            console.log(error)
        }     
    }

    //array para insertar las funciones asincronas
let pokeData = [];

//proceso para unir las funciones asincronas en un array
    pokemonesInfo().then((data) => {
        data.forEach(results => {
            getPicture(results.name).then((img) => {
                let pokeInfo = new Object();
                pokeInfo.nombre = results.name
                pokeInfo.img = img
                pokeData.push(pokeInfo)
                //console.log(pokeData)

                    //creacion json
                    // let documento = 'pokemones.json';
                    // let pokemones = JSON.stringify(pokeData)
                    // fs.writeFile(documento, pokemones, 'utf-8', function (err) {
                    //     if (err) {
                    //         return console.log(err);
                    //     }
                    // })
            
                    //promise.all
                    Promise.all(pokeData).then((data) => {
                        data.forEach((p) => {
                            let nombre = `${p.nombre}`
                            let img = `${p.img}`
                        console.log(nombre, img)
                        })
                        
                    })
                })
            })
        })

http.createServer((req, res) => {
    //leer el HTML
    if (req.url == '/') {
        res.writeHead(200, { 'Content-type': 'text/html' })
        fs.readFile('index.html', 'utf-8', (err, data) => {
            res.end(data)
        })
    }
        if (req.url==('/pokemones')) {
            res.writeHead(200, {'Content-type' : 'text/html'})
            fs.readFile('pokemones.json', 'utf-8', (err, data) => {
                res.end(data)
            })
        }
}).listen(3000,()=>console.log('Servidor ON y funcionando OK'))
