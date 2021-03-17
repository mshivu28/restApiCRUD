const express = require("express");
const app = express();
require("./db/conn")
const Student = require("./models/student")
const port = process.env.PORT || 3000;
app.use(express.json());

// app.post("/students",(req,res)=>{
//     console.log(req.body);                   /***** Via using THEN *****/
//     const user = new Student(req.body);
//     user.save().then(()=>{
//         res.status(201).send(user);     
//     }).catch((e)=>{
//         res.status(400).send(e);
//     })
    
// });
app.post("/students",async(req,res)=>{
    try{
        const user = new Student(req.body);    //// FROM await AND async 
        const createUser  = await user.save();
        res.status(201).send(createUser);
    }
    catch(e){
        res.status(400).send(e);
    }
})



app.get("/students",async (req,res)=>{
    try{
        const studentsData = await Student.find();
        res.status(201).send(studentsData);

    }
    catch(err){
        res.status(400).send(err);
    };
})

// HOW TO GET INDIVIDUAL STUDENT DATA By id

app.get("/students/:id", async(req,res)=>{
try{
    const _id = req.params.id;
    const studentData = await Student.findById(_id);
    console.log(studentData);
    if(!studentData){
       return res.status(404).send();
    }
    else
    {
        res.status(201).send(studentData);
    }
    
}
catch(err){
    res.status(400).send(err);
}

});
// UPDATE STUDENT DB BY ITS ID
app.patch("/students/:id", async(req,res)=>{
try{
    const _id = req.params.id;
    const updateStudents=await Student.findByIdAndUpdate(_id,req.body,{new : true});
    res.status(202).send(updateStudents);

}
catch(err){
    res.status(505).send(err);
}

})


// ---------------HOW TO DELETE FROM DB---------------------------------
app.delete("/students/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const deleteData = await Student.findByIdAndDelete(_id);
        if(!req.params.id)
        {
            return res.status(404).send();
        }
        else
        {
            res.send(deleteData);
        }

    }
    catch(err){
        res.status(500).send(err);
    }
})
app.listen(port,()=>{
    console.log(`Server is running ${port}`);
})