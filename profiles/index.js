import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import profileRouter from './routes/profile.js'

const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(cookieParser())
app.use(bodyParser.json({ limit: "30mb", extended: "true" }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" })) //check this info

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

app.use('/profile', profileRouter)

const connection_url = 'mongodb://localhost:27017/test';
const port = 4000

mongoose.connect(connection_url).then(() => {
    app.listen(port, () => console.log('Profiles are listenning on port : ', port))
}).catch((err) => console.log(err.message))
