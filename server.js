require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes)

const port = process.env.PORT || 3000
const mongoURI = process.env.Mongo_URI

mongoose.connect(mongoURI)
    .then(() => app.listen(port, () => console.log('server runing on port ', port)) )
    .catch( err => console.log(err) )


