const mongoose = require('mongoose')

const leadSchema = mongoose.Schema({
  score: Number,
  email: String,
  createdBy: String,
})

const LeadModel = mongoose.model('lead', leadSchema)

module.exports = { LeadModel }
