const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const bodyparser = require('body-parser')
dotenv.config( {path:'config.env'} )
const port = process.env.PORT || 3000
const app = express()

const connectDB = require('./server/database/connection')

//log request
app.use(morgan('tiny'))

// Connect DB
connectDB()

//parse request to bodyparser
app.use(bodyparser.urlencoded({ extended:true}))

//set view engine
app.set("view engine","ejs")
//app.set("views",path.resolve(__dirname,"views"))

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))

// load routers
app.use('/',require('./server/routes/router'))

app.listen(port,()=>{
    console.log("App listening",port)
})