require('dotenv').config()
import express from 'express'
const app = express()
import { router as userRouter } from './routes/user.route'
import { connectDB } from './db/db'
import cors from 'cors'

connectDB()
app.use(express.json())
app.use(cors())

app.use('/api/v1', userRouter)

app.listen(process.env.PORT || 5000, () => {
    console.log(`App is listening on port ${process.env.PORT}`)
})