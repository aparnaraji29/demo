const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://aparnaraji2000:Aparna29@cluster0.bswwvwk.mongodb.net/authdemo?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log('mongodb connected successfully')
})