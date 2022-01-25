const express = require('express')
const app = express()
const http = require('http').createServer(app)
const jwt = require("jsonwebtoken")
const crypto = require('crypto')
const mongoose = require('mongoose')

const users = require('./routes/users')

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'MERN_MVC API',
      description: 'This is the server of a simple mern login app.',
      contact: {
        name: 'contact name'
      },
      servers: ['http://192.168.1.26:3500']
    },
  },
  apis: ['server.js']
}

const swaggetDocs = swaggerJsDoc(swaggerOptions)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggetDocs))

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  next();
})

const dbURI = '<mongodb connection uri>'

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('connected to db'))
  .catch((err) => console.log(err))

app.use(express.json())
app.use('/user', users)

const PORT = process.env.PORT || 5000

http.listen(PORT, function(){
  console.log(`listening on *:${PORT}`)
})