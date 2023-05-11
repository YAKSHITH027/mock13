const express = require('express')
const { UserModel } = require('../models/user.model')
const bcrypt = require('bcrypt')
const userRoute = express.Router()
var jwt = require('jsonwebtoken')
userRoute.post('/signup', async (req, res) => {
  try {
    let userData = req.body
    console.log(userData)
    let userInDB = await UserModel.find({ email: userData.email })
    // console.log(userInDB)
    if (userInDB.length) {
      return res.status(400).send({ msg: 'user is already registerd' })
    }
    bcrypt.hash(userData.password, 3, async function (err, hash) {
      // Store hash in your password DB.
      if (hash) {
        let newUser = new UserModel({ ...userData, password: hash })
        await newUser.save()
        res.status(200).send({ msg: 'user has been registered' })
      } else {
        res.status(400).send({ msg: 'registern failed' })
      }
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({ msg: 'something went wrong' })
  }
})
userRoute.post('/signin', async (req, res) => {
  try {
    let userData = req.body
    console.log(userData)
    let userInDB = await UserModel.find({ email: userData.email })
    // console.log(userInDB)
    if (userInDB.length == 0) {
      return res.status(400).send({ msg: 'user is not registered' })
    }

    bcrypt.compare(
      userData.password,
      userInDB[0].password,
      async function (err, hash) {
        // Store hash in your password DB.
        if (hash) {
          var token = jwt.sign({ userId: userInDB[0]._id }, 'secret')
          res.status(200).send({ msg: 'login success', token })
        } else {
          res.status(400).send({ msg: 'login failed' })
        }
      }
    )
  } catch (error) {
    console.log(error)
    res.status(400).send({ msg: 'something went wrong' })
  }
})

module.exports = { userRoute }
