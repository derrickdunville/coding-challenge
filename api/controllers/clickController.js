let mongoose      = require('mongoose'),
    mongodb       = require('mongodb'),
    Link          = mongoose.model('Link')

exports.createClick = async function(req, res) {
  try {
    let targetLink = await Link.findOne({title: req.params.title})
    if(!targetLink){
      res.status(404).send({err: {message: "target link not found"}})
      return
    }
    let updatedLink = await Link.findOneAndUpdate({title: targetLink.title}, {clicks: targetLink.clicks + 1}, {new: true})
    if(updatedLink){
      res.status(200).send()
    } else {
      res.status(400).send()
    }
    
  } catch(error) {
    console.dir(error)
    res.status(500).send(error)
  }
};
