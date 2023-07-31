const request = require('request')



const geoCoding = (address, callback) => {
    const token = 'pk.eyJ1Ijoic3VyYWotc3VyeWF3YW5zaGkiLCJhIjoiY2xrYzc5a25iMHBwdjNwbXdnYWdlcDY4bSJ9.qpIyAQk6XqQUi0BJejwlvQ'
    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${token}&limit=1`

    request({ url: geocodingUrl, json: true }, (error, {body}={}) => {
        if (error) {
            callback(error, undefined)
          
        } else if (body.message) {

            callback(undefined, response.body.message)
            
        } else if (body.features.length == 0) {
            //console.log(body)

            callback("Location Error", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports=geoCoding