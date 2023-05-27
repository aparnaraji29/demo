const express = require('express')

const mongoose = require('mongoose')

const routes = require('./routes/routes')

const cors = require('cors')

const cookieParser = require('cookie-parser')
const PORT = 8000;

const app = express()

require('./middlewares/mongoDB') //init mongodb

app.use(cors({
    credentials:true,
    origin: ['http://localhost:4200']
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/jwtapp')));

app.use("/api",routes)






console.log(path.join(__dirname + '/dist/jwtapp/index.html'))
//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/jwtapp/index.html'));
});




app.listen(PORT, ()=>{
    console.log(`...........server started at port ${PORT}.........`)
})