const express=require('express')
const customerRouter=require('./routes/customer')
const indexRouter=require('./routes/index')
const methodOverride = require('method-override')
const mongoose=require('mongoose')
require('dotenv').config()
const app=express()

//views
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))


const connectFunc =async()=>{
    try{
        //mongodb://localhost/bai2
        await mongoose.connect(process.env.STR_CONNECT)
        console.log("connected successfull")
    }catch(e){
        console.log("connection failed")
    }
}
connectFunc()

app.use('/customer/',customerRouter)

app.use('/',indexRouter)
app.listen(process.env.PORT||3000)