const logger=require('./config/logger')
const express=require('express')
const app=express()
const path =require('path')
const mongoose=require('mongoose')
const cors=require('cors')
const cookieParser=require('cookie-parser')


require('dotenv').config()

//middleware
app.use(cookieParser()) 
app.use(express.json()) 

app.use(cors({
    credentials:true,
    origin:['http://localhost:3000','https://e-com-admin-frontend.onrender.com','https://e-com-admin-frontend.vercel.app']
}))
app.use('/public',express.static(path.join(__dirname,'upload')))
//mongodb connect
try {
    mongoose.connect(process.env.Mongo_DB,(err,connect)=>{
        
        if(err){
            console.log(err,'error occured in mongo db')
            return
        }
        if(connect){
            console.log('databse connected')
           // console.log(connect)
            return
        }
        console.log('somwthing went wrong database not found')
        
   
}) 
} catch (error) {
    console.log(error)   
}

//routes
const userAdmin=require('./router/userAdmin')
app.use('/userAdmin',userAdmin)
const category=require('./router/category')
app.use('/category',category)
const product=require('./router/product')
app.use('/product',product)
const sell=require('./router/sell')
app.use('/sell',sell)
const supplier=require('./router/supplier')
app.use('/supplier',supplier)
const employee=require('./router/employeeAdmin')
app.use('/employee',employee)


//listen to port 
const port=process.env.PORT || 6002

app.listen(port,(err)=>{
    if(!err){  
        logger.info(`sever listened  ${port}`)
    }
})