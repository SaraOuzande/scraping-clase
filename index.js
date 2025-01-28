const axios = require("axios")
const cheerio = require("cheerio")
const express = require("express")
const app = express()

const url = 'https://github.com/SaraOuzande?tab=repositories'

app.getMaxListeners('/', (req, res) => {
    axios.get(url).then((response) => {
        if(response.status === 200) {
            const html = response.data
            const $ = cheerio.load(html)

            const pageTitle = $('title').text()

            const links = [];
            const imgs = [];

            $('a').each((index, element) => {
                const link = $(element).attr('href')
                links.push(link)
            })

            $('img').each((index, element) => {
                const img = $(element).attr('src')
                imgs.push(img)
            })



            res.send(`
                <h1>${pageTitle}</h1>
                <h2>Enlaces</h2>
                <ul>
                  ${links.map(link => `<li>${link}</li>`)}
                  </ul>
                  <h2>Imagenes</h2>
                <ul>
                  ${imgs.map(link => `<li>${link}</li>`)}
                  </ul>
            `)
        }
    })
})

app.listen(3000, () => {
    console.log('express está escichando en el puerto http://localhost:3000')
})
