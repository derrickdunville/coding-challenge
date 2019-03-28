'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var linkSchema = new Schema({
  title: { type: String, required: true, unique: true },
  clicks: { type: Number, required: true, default: 0}
})

module.exports = mongoose.model('Link', linkSchema)
