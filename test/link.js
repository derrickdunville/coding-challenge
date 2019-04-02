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
  describe('POST /links', () => {
    it('it should post a new link', (done) => {
      let newLink = {
        title: "spartans"
      }
      chai.request(server)
        .post('/links').send(newLink).end((err, res) => {
          res.should.have.status(201)
          res.body.should.have.property("title")
          res.body.title.should.eql("spartans")
          done()
        })
    })
    it('it should get link already exists', (done) => {
      let newLink = {
        title: "spartans"
      }
      chai.request(server)
        .post('/links').send(newLink).end((err, res) => {
          res.should.have.status(400)
          res.body.should.have.property("err")
          res.body.err.should.have.property("message")
          res.body.err.message.should.eql("link already exists")
          res.body.err.should.have.property("type")
          res.body.err.type.should.eql("ValidationError")
          done()
        })
    })
    it('it should get link can only contain alphanumeric characters and underscores', (done) => {
      let newLink = {
        title: "?spartans"
      }
      chai.request(server)
        .post('/links').send(newLink).end((err, res) => {
          res.should.have.status(400)
          res.body.should.have.property("err")
          res.body.err.should.have.property("message")
          res.body.err.message.should.eql("link title can only contain alphanumeric characters and underscores")
          res.body.err.should.have.property("type")
          res.body.err.type.should.eql("ValidationError")
          done()
        })
    })
    it('it should get link title is required', (done) => {
      let newLink = {
        title: ""
      }
      chai.request(server)
        .post('/links').send(newLink).end((err, res) => {
          res.should.have.status(400)
          res.body.should.have.property("err")
          res.body.err.should.have.property("message")
          res.body.err.message.should.eql("link title is required")
          res.body.err.should.have.property("type")
          res.body.err.type.should.eql("ValidationError")
          done()
        })
    })
  })
  describe('GET /links', () => {
    it('it should get a list of links', (done) => {
      chai.request(server)
        .get('/links')
        .send()
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })
  describe('GET /links/:title', () => {
    it('it should get a link', (done) => {
      chai.request(server)
        .get('/links/' + link1.title)
        .send()
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("object")
          res.body.should.have.property("title")
          res.body.title.should.eql(link1.title)
          done()
        })
    })
    it('it should get target link not found', (done) => {
      chai.request(server)
        .get('/links/' + "notfound")
        .send()
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.have.property("err")
          res.body.err.should.have.property("message")
          res.body.err.message.should.eql("target link not found")
          res.body.err.should.have.property("type")
          res.body.err.type.should.eql("NotFoundError")
          done()
        })
    })
  })
  describe('PUT /links/:title', () => {
    it('it should update a link', (done) => {
      chai.request(server)
        .put('/links/' + link1.title)
        .send({
          title: "updatedlink"
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("object")
          res.body.should.have.property("title")
          res.body.title.should.eql("updatedlink")
          done()
        })
    })
    it('it should get target link not found', (done) => {
      chai.request(server)
        .put('/links/' + "notfound")
        .send({
          title: "updatedlink2"
        })
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.have.property("err")
          res.body.err.should.have.property("message")
          res.body.err.message.should.eql("target link not found")
          res.body.err.should.have.property("type")
          res.body.err.type.should.eql("NotFoundError")
          done()
        })
    })
    it('it should get link already exists', (done) => {
      chai.request(server)
        .put('/links/' + link2.title)
        .send({
          title: link3.title
        })
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.have.property("err")
          res.body.err.should.have.property("message")
          res.body.err.message.should.eql("link already exists")
          res.body.err.should.have.property("type")
          res.body.err.type.should.eql("ValidationError")
          done()
        })
    })
    it('it should get link can only contain alphanumeric characters and underscores', (done) => {
      chai.request(server)
        .put('/links/' + link2.title)
        .send({title: "?spartans"})
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.have.property("err")
          res.body.err.should.have.property("message")
          res.body.err.message.should.eql("link title can only contain alphanumeric characters and underscores")
          res.body.err.should.have.property("type")
          res.body.err.type.should.eql("ValidationError")
          done()
        })
    })
    it('it should get link title is required', (done) => {
      chai.request(server)
        .put('/links/' + link2.title)
        .send({title: ""})
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.have.property("err")
          res.body.err.should.have.property("message")
          res.body.err.message.should.eql("link title is required")
          res.body.err.should.have.property("type")
          res.body.err.type.should.eql("ValidationError")
          done()
        })
    })
  })
  describe('DELETE /links/:title', () => {
    it('it should delete a link', (done) => {
      chai.request(server)
        .delete('/links/' + link3.title)
        .send()
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property("title")
          res.body.title.should.eql(link3.title)
          res.body.should.have.property("message")
          res.body.message.should.eql("link successfully deleted")
          done()
        })
    })
    it('it should get target link not found', (done) => {
      chai.request(server)
        .delete('/links/' + "notfound")
        .send()
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.have.property("err")
          res.body.err.should.have.property("message")
          res.body.err.message.should.eql("target link not found")
          res.body.err.should.have.property("type")
          res.body.err.type.should.eql("NotFoundError")
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
