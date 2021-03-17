const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/studentsapi1",
{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
.then(()=>{
    console.log("connection is successfully built")
}).catch((err)=>{
    console.log("No connection");
})
