const express = require('express')
const cors = require('cors')

const { userRoute } = require('./routes/user.routes')
const { quizRoute } = require('./routes/quiz.routes')
const { connection } = require('./db')
const { leadRoute } = require('./routes/lead.routes')

require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send({ msg: 'home page' })
})

app.use('/user', userRoute)
app.use('/quiz', quizRoute)
app.use('/lead', leadRoute)

app.listen(process.env.port, async () => {
  try {
    await connection
    console.log('db is connected')
  } catch (error) {
    console.log(error)
  }
  console.log('port is running')
})
