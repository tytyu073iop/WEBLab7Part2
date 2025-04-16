const express = require('express')
const app = express()
const port = 3000

app.use(express.static("."))

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/" + "SPA.html")
})

const contentFolder = "content";

app.get('/:page', (req, res) => {
  res.sendFile(__dirname + `/${contentFolder}/${req.params.page}.html`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})