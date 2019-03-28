//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

let mongoose  = require("mongoose"),
    Link      = require('../api/models/linkModel'),
    chai      = require('chai'),
    chaiHttp  = require('chai-http'),
    server    = require('../server'),
    should    = chai.should()

chai.use(chaiHttp)

describe('Links', () => {

  // Test link models
  let link1 = null
  let link2 = null
  let link3 = null

  before((done) => {
    Link.remove({})
    .then(() => {
      let testLink = new Link({title: "link1"})
      return testLink.save()
    }).then(testLink => {
      link1 = testLink._doc
      let testLink2 = new Link({title: "link2"})
      return testLink2.save()
    }).then(testLink2 => {
      link2 = testLink2._doc
      let testLink3 = new Link({title: "link3"})
      return testLink3.save()
    }).then(testLink3 => {
      link3 = testLink3._doc
      done()
    }).catch(err => {
      done()
    })
  })
  describe('POST /click', () => {
    it('it should post a new click', (done) => {
      chai.request(server)
        .post('/click/'+ link1.title).send().end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
    it('it should return target link not found', (done) => {
      chai.request(server)
        .post('/click/'+ "notfound").send().end((err, res) => {
          res.should.have.status(404)
          res.body.should.have.property("err")
          res.body.err.should.have.property("message")
          res.body.err.message.should.eql("target link not found")
          done()
        })
    })
  })
  after((done) => {
    Link.remove({})
    .then(() => {
      done()
    }).catch(err => {
      done()
    })
  })
})
