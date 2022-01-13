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
    
    //ejecucion de la promesa. Acá también se transformará el objeto javascript en json.
    pokemonesInfo().then((data) => {
        data.forEach(results => {
            getPicture(results.name).then((img)=> {
                let pokeInfo = new Object();
                pokeInfo.nombre = results.name
                pokeInfo.img = img
                pokeData.push(pokeInfo)
                //console.log(pokeData)
                //let pokemones = JSON.stringify(pokeData)
                //console.log(pokemones)
            })  
             Promise.all(pokeData).then((data) => {
             data.forEach((p) => {
             console.log(`${p.name}, ${p.img}`)
                })
            })
        })  
       
    }) 
    
}).listen(3000,()=>console.log('Servidor ON y funcionando OK'))