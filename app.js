//Hello World!

var express = require("express")
var url = require("url")
//var chrono = require("chrono-node")
//chrono.parseDate('An appointment on Sep 12-13')
var app = express()

app.set('port', (process.env.PORT || 5000))
//app.use(express.static(__dirname + '/public'))

app.get('*', function(req, res) {
  res.send('Hello World!')
  console.log(url.parse(req.url).pathname)
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

//
