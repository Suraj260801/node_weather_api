const express= require('express')
const path =require('path')

const app=express()

//using html templates files from different directory

console.log(__dirname) //prints the current directory name
console.log(__filename)  //prints the current file name

const templates=path.join(__dirname,"../templates")
app.use(express.static(templates))

app.get("",(req,res)=>{
    res.send("Hello Express")
})

app.get("/help",(req,res)=>{
    res.send("<h1>Help</>")
})

app.get("/about",(req,res)=>{
    res.send({
        name:"Suraj",
        age:15
    })
})

app.listen(3000,()=>{
    console.log("Server is running on port No:3000")
})