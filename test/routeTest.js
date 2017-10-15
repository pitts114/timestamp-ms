var chai = require("chai")
var server = require("../app.js").app

chai.use(require("chai-http"))

describe("/GET homepage", function(){
  it("should receive response", function(){
    chai.request(server)
      .get("/")
      .end(function(err,res){
        chai.assert.equal(res.status, 200)
      })
  })
})

describe("/GET unix", function(){
  it("/1450137600 should return December 15, 2015", function(){
    chai.request(server)
      .get("/1450137600")
      .end(function(err,res){
        chai.assert.equal(res.status, 200)
        chai.assert.equal(res.body.natural, "December 15, 2015")
        chai.assert.equal(res.body.unix, 1450137600)
      })
  })


  it("/0 should return January 01, 1970", function(){
    chai.request(server)
      .get("/0")
      .end(function(err,res){
        chai.assert.equal(res.body.natural, "January 01, 1970")
      })
  })

})

describe("/GET natural", function(){
  it("'/December 15, 2015' returns 1450137600", function(){
    chai.request(server)
      .get("/December 15, 2015")
      .end(function(err,res){
        chai.assert.equal(res.status, 200)
        chai.assert.equal(res.body.unix, 1450137600)
        chai.assert.equal(res.body.natural, '/December 15, 2015')
      })
  })

    it("/January 01, 1970 should return 0", function(){
      chai.request(server)
        .get("/January 01, 1970")
        .end(function(err,res){
          chai.assert.equal(res.body.status, 200)
          chai.assert.equal(res.body.unix, 0)
          chai.assert.equal(res.body.natural, "January 01, 1970")
        })
    })
})
