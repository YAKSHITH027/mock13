const express = require('express')
const { LeadModel } = require('../models/lead.model')

const leadRoute = express.Router()

leadRoute.get('/:id', async (req, res) => {
  try {
    let { id } = req.params
    let allQuiz = await LeadModel.find({ createdBy: id })
    res.status(200).send(allQuiz)
  } catch (error) {
    res.status(400).send({ msg: 'something went wrong' })
  }
})
leadRoute.post('/', async (req, res) => {
  try {
    let data = req.body
    let newQuiz = new LeadModel(data)
    await newQuiz.save()
    res.status(200).send({ msg: 'quiz saved' })
  } catch (error) {
    res.status(400).send({ msg: 'something went wrong' })
  }
})

module.exports = { leadRoute }
