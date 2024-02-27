import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.DATABASEURL).then(() => {
    console.log('Connected to DB!')
}).catch((err) => {
    console.log(err)
})

const app = express()

app.listen(3000, () => {
    console.log('Server Running on port 3000')
})