const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3001
const indexRouter = require('./routes/index')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, console.log('Connected to database'))

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use('/api', indexRouter)

app.listen(PORT, console.log(`Server is running on port: ${PORT}`))
