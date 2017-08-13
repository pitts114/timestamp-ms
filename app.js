//TODO parse the url /:dateStr instead of wildcard, will need to serve index.hmtl
var express = require("express")
var url = require("url")
var chrono = require("chrono-node")
var timestamp = require("unix-timestamp")
var numberToDate = require("number-to-date")
//chrono.parseDate('An appointment on Sep 12-13')
var app = express()
const allNumbers = /^[0-9]*$/

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/*', function(req, res) {
  var pathname = url.parse(req.url).pathname.replace(/%20/g, ' ').replace('/', '')
  console.log("Pathname: " + pathname)
//  var obj = JSON.stringify(parsePath(pathname))
  var obj = parsePath(pathname)
  console.log(obj)
  res.setHeader('Content-Type', 'application/json');
  res.jsonp(obj)
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})


//from the pathname, convert to unix and natural time
//return
function parsePath(str) {
  var obj = {}
  console.log(str)
  var date = chrono.parse(str) //returns [] if not valid
  if (date.length != 0) { //natural date, may or may not be a full date
    console.log(date[0].start.knownValues)
    var iso = toISO(date)
    if (iso) { //if a full date
      obj.unix = isoToUnix(iso)
      obj.natural = isoToNatural(iso)
    }
  } else if (str.match(allNumbers)) { //if unix format
    console.log("unix")
    obj.unix = Number(str)
    obj.natural = unixToNatural(obj.unix)
  }
  //if niether, fields are null
  else {
  obj.unix = null
  obj.natural = null
}

  return obj
}

//converts parsed chrono to ISO if chrono is valid, otherwise returns null
function toISO(date) {
  //checks for 3 known values from chrono date: year, month, day
  //if not all are present, returns null
  var known = date[0].start.knownValues
  if (known.day && known.month && known.year) {
    return known.year.toString() + '-'
    + known.month.toString() + '-'
    + known.day.toString()
  }
  return null
}

function isoToNatural(iso) {
  //2015-12-15
  iso = iso.split("-")
  var year = iso[0]
  var month = iso[1]
  var day = iso[2]

  return numberToDate(month, 'month') + " "
  + day.toString() + ", "
  + year.toString() //December 12, 2015
}

function isoToUnix(str) {
  //2015-12-15
  return timestamp.fromDate(str) //1450137600
}


function unixToNatural(num) {
  //javascript Date takes local time zone into account, which is annoying
  //1450137600 => 2015-12-15
  var iso = new Date(num * 1000).toISOString().split('T')[0]
  //2015-12-15 to December 12, 2015
  iso = iso.split('-')
  var year = iso[0]
  var month = iso[1]
  var day = iso[2]

  return numberToDate(month, 'month') + " "
   + day.toString() + ", "
    + year.toString()
}



//
