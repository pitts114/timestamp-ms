//Hello World!
var express = require("express")
var app = express()
const port = 3000

app.get('/', (req, res) => {
  res.write("Hello World!")
  res.end()
})

app.listen(port)




//
