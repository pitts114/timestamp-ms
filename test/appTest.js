var app = require("../app.js")

var assert = require("chai").assert

describe("ISO to UNIX time", function(){
  it("Should return '2015-12-15' as 1450137600", function(){
    var result = app.isoToUnix("2015-12-15")
    assert.equal(result, 1450137600)
  })
})
