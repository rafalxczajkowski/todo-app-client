const path = require('path')
const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index')
require('dotenv').config()
const PORT = process.env.PORT || 3001

mongoose.connect(process.env.MONGO_URI, console.log('Connected to database'))

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use(express.json())
app.use('/api', indexRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.listen(PORT, console.log(`Server is running on port: ${PORT}`))
