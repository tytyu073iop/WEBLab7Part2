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

app.get('/JSON/:page', (req, res) => {
  res.sendFile(__dirname + `/${contentFolder}/${req.params.page}.json`);
  res.download(__dirname + `/${contentFolder}/${req.params.page}.json`, (err) => {
     if (err) {
      // Handle error, but keep in mind the response may be partially-sent
      // so check res.headersSent
      console.log("download error");
      console.log(res.headersSent);
    } else {
      console.log("downloaded sucsessfully");
    }
  }
  );
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})