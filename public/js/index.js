console.log('This is sample javascript')

// fetch("https://puzzle.mead.io/puzzle").then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })

// })





const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne= document.querySelector('#location')
const forecast= document.querySelector('#forecast')
const temprature=document.querySelector('#temprature')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const address = searchElement.value
    //1.user types value in form.
    //2.we fetch address value using client side javascript in address.
    //we hit the url below using fetch request.
    //hitting above url calls app.get('weather') endpoint which runs server side js.
    //node gets response from server using get and sends to client side web.
    //fetch request receives json response from get request and sends to client side js.
    let url = `http://localhost:3000/weather?address=${address}`
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data.response)
                const location=data.response.location
                const current=data.response.current
                messageOne.textContent="Location: "+location.name+","+location.region+","+location.country
                forecast.textContent="Forecast: "+current.condition.text
                temprature.textContent="Temprature: "+current.temp_c+"C"

            }

        })

    })

}

)