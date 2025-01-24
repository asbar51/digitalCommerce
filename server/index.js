import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import postRouter from './routes/post.js'
import profileRouter from './routes/profile.js'

const app = express()
app.use(cors({
    origin:'https://streamara.com/',
    credentials:true
}))
app.set('trust proxy', 1);

app.use(cookieParser())
app.use(bodyParser.json({limit:"30mb",extended:"true" }))
app.use(bodyParser.urlencoded({limit:"30mb",extended:"true" })) //check this info

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

app.use('/posts', postRouter)
app.use('/profile', profileRouter)

const connection_url = 'mongodb+srv://admin:admin@marketplace-data.wgefi.mongodb.net/marketplaceDB';
// const connection_url = 'mongodb://localhost:27017/test';
const port = process.env.PORT || 3000

mongoose.connect(connection_url).then(() => {
    app.listen(port, () => console.log('we are listenning on port : ',port))
}).catch((err) => console.log(err.message))
