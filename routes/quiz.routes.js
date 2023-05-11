const express = require('express')
const { QuizModel } = require('../models/quiz.model')

const quizRoute = express.Router()

quizRoute.get('/', async (req, res) => {
  try {
    let allQuiz = await QuizModel.find()
    res.status(200).send(allQuiz)
  } catch (error) {
    res.status(400).send({ msg: 'something went wrong' })
  }
})
quizRoute.post('/', async (req, res) => {
  try {
    let data = req.body
    let newQuiz = new QuizModel(data)
    await newQuiz.save()
    res.status(200).send({ msg: 'quiz saved' })
  } catch (error) {
    res.status(400).send({ msg: 'something went wrong' })
  }
})

module.exports = { quizRoute }
