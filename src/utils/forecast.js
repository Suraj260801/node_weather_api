const request = require("request")

 const forecast=(latitude,longitude,callback)=>{
    const free_weather_api=`http://api.weatherapi.com/v1/current.json?key=261534a3c980406cbb053819232407&q=${latitude},${longitude}&aqi=no`
    //we are using {body}={} instead of only {body}} bacause if error occurs in geocode body will be undefined,and 
    //destructering undefined further will produce an error.
    request({url:free_weather_api,json:true},(error,{body}={})=>{
        if(error){
            callback(error,undefined)
        }else if(body.error){
            console.log(body.error,undefined)
        }else{
            callback(undefined,body)
        }
    })
 }

 module.exports=forecast