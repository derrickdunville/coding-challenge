let mongoose      = require('mongoose'),
    mongodb       = require('mongodb'),
    Link          = mongoose.model('Link')


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

    let linkExists = await Link.findOne({title: req.body.title})
    if(linkExists){
      res.status(400).send({err: {message: "link already exists"}})
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
      res.status(404).send({err: {message: "target link not found"}})
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
      res.status(404).send({err: {message: "target link not found"}})
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
      res.status(404).send({err: {message: "target link not found"}})
      return
    }
    res.status(200).send({message: "link successfully deleted"})
  } catch(error) {
    console.dir(error)
    res.status(500).send(error)
  }
}
