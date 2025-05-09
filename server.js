require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes)

mongoose.connect(process.env.Mongo_URI)
    .then(() => app.listen(3000, () => console.log('server runing on port 3000')) )
    .catch( err => console.log(err) )


