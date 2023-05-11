const express = require('express')
const cors = require('cors')

const { userRoute } = require('./routes/user.routes')
const { connection } = require('./db')

require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send({ msg: 'home page' })
})

app.use('/user', userRoute)

app.listen(process.env.port, async () => {
  try {
    await connection
    console.log('db is connected')
  } catch (error) {
    console.log(error)
  }
  console.log('port is running')
})
