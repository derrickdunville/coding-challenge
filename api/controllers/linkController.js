let mongoose      = require('mongoose'),
    mongodb       = require('mongodb'),
    Link          = mongoose.model('Link'),
    NotFoundError = require('../constants/NotFoundError')

const alphaNumericUnderscoreRegex = new RegExp("^[a-zA-Z0-9_]+$")

exports.listLinks = async function(req, res) {
  try {
    let links = await Link.find({})
    res.status(200).send(links)
  } catch(error) {
    console.dir(error)
    res.status(500).send(error)
  }
};

exports.createLink = async function(req, res) {
  try {
    if(req.body.title === ''){
      res.status(400).send({err: {type: "ValidationError", message: "link title is required"}})
      return
    }
    if(!alphaNumericUnderscoreRegex.test(req.body.title)){
      res.status(400).send({err: {type: "ValidationError", message: "link title can only contain alphanumeric characters and underscores"}})
      return
    }
    let linkExists = await Link.findOne({title: req.body.title})
    if(linkExists){
      res.status(400).send({err: {type: "ValidationError", message: "link already exists"}})
      return
    }
    let newLink = new Link({
      title: req.body.title
    })
    let savedLink = await newLink.save()
    res.status(201).send(savedLink)
  } catch(error) {
    console.dir(error)
    res.status(500).send(error)
  }
};

exports.readLink = async function(req, res) {
  try {
    let link = await Link.findOne({title: req.params.title})
    if(!link){
      res.status(404).send(NotFoundError)
      return
    }
    res.status(200).send(link)
  } catch(error){
    console.dir(error)
    res.status(500).send(error)
  }
};

exports.updateLink = async function(req, res) {
  try {
    let updatedLink = await Link.findOneAndUpdate({title: req.params.title}, {title: req.body.title}, {new: true})
    if(!updatedLink){
      res.status(404).send(NotFoundError)
      return
    }
    res.status(200).send(updatedLink)
  } catch(error) {
    console.dir(error)
    res.status(500).send(error)
  }
};

exports.deleteLink = async function(req, res) {
  try {
    let deletedLink = await Link.deleteOne({ title: req.params.title })
    if(!deletedLink){
      res.status(404).send(NotFoundError)
      return
    }
    res.status(200).send({title: req.params.title, message: "link successfully deleted"})
  } catch(error) {
    console.dir(error)
    res.status(500).send(error)
  }
}
