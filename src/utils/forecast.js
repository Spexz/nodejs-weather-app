const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/64c3ef352f1635197f0b6cf182feaf97/'+ latitude + ','+ longitude +'?units=si&lang=en'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + 
            ' degrees out. There is a ' + (body.currently.precipProbability * 100).toFixed(2) + '% chance of rain. ' + 
            "The high today is: " + body.daily.data[0].temperatureHigh + ' with a low of: ' + 
            body.daily.data[0].temperatureLow)
        }
    })
}

module.exports = forecast