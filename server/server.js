import { resolve } from 'path'
import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import { connect } from 'mongoose'
import indexRouter from './routes/index'
import 'dotenv/config'
const PORT = process.env.PORT || 3001

connect(process.env.MONGO_URI, console.log('Connected to database'))

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.static(resolve(__dirname, '../client/build')))
app.use(express.json())
app.use('/api', indexRouter)

app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, '../client/build', 'index.html'))
})

app.listen(PORT, console.log(`Server is running on port: ${PORT}`))
