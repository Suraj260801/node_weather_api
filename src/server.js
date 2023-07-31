
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const geoCoding=require("./utils/geocode")
const forecast=require("./utils/forecast")
const port=5002

//using html templates files from different directory

//console.log(__dirname) //prints the current directory name
//console.log(__filename)  //prints the current file name

//define paths for Express config

//public directory path
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//console.log(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

//this will search the viewsPath dir instead of views which is templates(its like renaming views or customization)
//by default(without this line) it will search for views in the directory from which we 
//are runnin the program
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', { title: "Weather App:HomePage", name: "Suraj" })
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About Me", name: "Suraj" })
})

app.get('/help', (req, res) => {
    res.render('help', { title: "Need Help?", name: "Suraj" })
})

app.get('/help/*', (req, res) => {
    res.render('error', { message: "Help Article not found", name: "Suraj", error_code: 404 })
})




app.get('/weather', (req, res) => {

     if(!req.query.address){
        return res.send({error:"Address is required"})
     }
     geoCoding(req.query.address, (error, {latitude,longitude,location}={}) => {
        if (error) {
            return res.send({
                error:error,
                type:"Geocoding Error"
            })
        } else {
            forecast(latitude,longitude,(error ,response2)=>{
                if(error){
                    res.send({
                        error:error,
                        type:"Forecast Error"
                    })
                }else{
                    res.send({
                        response:response2
                      
                    })
                }
            })
        }
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        //if we don't return from this function or after sending an error response
        //then after sending error again response wiil be sent from line 65 which 
        //is not allowed,  i.e sending 2 responsed is invalid that is why we are getting
        //"Cannot set headers after they are sent to the client" error
        return res.send({ error: "You must provide a search term" })
    }
    //this prints query in url ,it does not include base url and endpoint.
    //(https:google.com?search=flipcart&item=mobile)
    //base url:https:google.com
    //endpoint:products
    //query:search=flipcart&item=mobile
    console.log(req.query)   
    res.send({
        products: []
    })

})
app.get('*', (req, res) => {
    res.render('error', { message: "Page does not exists", name: "Suraj", error_code: 404 })
})
app.listen(port, () => {
    console.log("Server is running on port No:3000")

})