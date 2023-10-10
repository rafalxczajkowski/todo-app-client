import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import { connect } from 'mongoose'
import router from './routes/index.js'
import 'dotenv/config'

const PORT = process.env.PORT || 3001

connect(process.env.MONGO_URI, console.log('Connected to database'))

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use('/api', router)

app.listen(PORT, console.log(`Server is running on port: ${PORT}`))
