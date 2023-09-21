import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import { connect } from 'mongoose'
import router from './routes/index.js'
import 'dotenv/config'

const PORT = process.env.PORT || 3001
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

connect(process.env.MONGO_URI, console.log('Connected to database'))

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, '../client/build')))
app.use(express.json())
app.use('/api', router)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

app.listen(PORT, console.log(`Server is running on port: ${PORT}`))
