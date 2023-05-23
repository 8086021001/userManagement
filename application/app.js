const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require("mongoose");
const userRoutes = require('./routes/user')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path');
const adminRoutes = require('./routes/adminRoute')


const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-access-token']
}
app.use(cors(corsOptions));


app.use(express.static(path.join(__dirname, ('./public'))))

app.use(cookieParser());

app.use(express.urlencoded({extended: true}))

app.use(express.json());


// DB connection
const connectDb = (URL) => {
    return mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}


const port = process.env.PORT
const URL = process.env.Mongo_URI


// router middlewares
app.use("/user", userRoutes)
app.use("/admin", adminRoutes)


// starting
async function start() {
    await connectDb(URL)
    app.listen(port, () => {
        console.log(`Connected to db and running on port ${port} `)
    })
}


start()
