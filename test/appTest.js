var app = require("../app.js")

var assert = require("chai").assert

describe("ISO to UNIX time", function(){
  it("Should return '2015-12-15' as 1450137600", function(){
    var result = app.isoToUnix("2015-12-15")
    assert.equal(result, 1450137600)
  });
  it("Should return '1970-01-01' as 0", function(){
    var result = app.isoToUnix("1970-01-01")
    assert.equal(result, 0)
  })
  it("Should have the type 'number'", function(){
    assert.isNumber(app.isoToUnix("2015-12-15"))
  })
})

describe("ISO to Natural", function(){
  it("Should return '2015-12-15' as 'December 15, 2015.'", function(){
    var result = app.isoToNatural("2015-12-15")
    assert.equal(result, "December 15, 2015")
  })
})
