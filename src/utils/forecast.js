const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=31794df99a011557babd4438788ee169&query=${latitude},${longitude}`

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to Weather Services!', undefined)
        }
        else if(body.error){
            callback('Unable to find the specified location. Try another search!', undefined)
        }
        else{
            const currWeather = body.current
            callback(undefined,
                    `${currWeather.weather_descriptions[0]}. It is currently
 ${currWeather.temperature} degrees Celsius out. But, it feels like ${currWeather.feelslike}
 degrees Celsius out. Humidity is ${currWeather.humidity}%. Forecast as on: 
 ${body.location.localtime}.`
                    )
        }
    })
}

module.exports = forecast