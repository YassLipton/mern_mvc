const User = require('../models/User')
const crypto = require('crypto')
const generateAccessToken = require('../authentication/generateAccessToken')

exports.list = (req, res) => {
  User.find()
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'An error occured' })
    })
}

exports.details = (req, res) => {
  User.findById(req.params._id)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'An error occured' })
    })
}

exports.create = (req, res) => {
  const newUser = new User(req.body)
  console.log(req.body)
  newUser.save()
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'An error occured' })
    })
}

exports.createDefault = (req, res) => {
  const newUser = new User({
    email: 'john@mail.com',
    password: 'test',
    firstName: 'John',
    lastName: 'Doe'
  })
  newUser.save()
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'An error occured' })
    })
}

exports.update = (req, res) => {
  User.findByIdAndUpdate(req.params._id, req.body)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'An error occured' })
    })
}

exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params._id)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'An error occured' })
    })
}

exports.login = (req, res) => {
  const email = req.body.email
  const password = crypto.createHash('md5').update(req.body.password).digest('hex') 

  console.log(req.body.password, password)

  User.find({email, password}).select({createdAt: 0, updatedAt: 0})
    .then((result) => {
      if (result.length > 0) {
        const accessToken = generateAccessToken({ 
          id: result[0]._id,
          email: result[0].email,
          firstName: result[0].firstName,
          lastName: result[0].lastName
         })
        res.send({
          successfullyLogged: true,
          accessToken: accessToken
        })
      } else {
        res.send({
          successfullyLogged: false
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.send({
        successfullyLogged: false
      })
    })
}

exports.logout = (req, res) => {
  res.status(204).send("Successfully logged out")
}

exports.checkToken = (req, res) => {
  res.status(200).send(req.user)
}