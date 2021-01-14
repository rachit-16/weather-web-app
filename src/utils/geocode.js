const request = require('request')


const geocode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicnAxNiIsImEiOiJja2psdHBmaDEyNm5iMnlsb210dmF6ZTRoIn0.oTZQyXkzBXa7NZlUUSbn6Q&limit=1`

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to Location Services!', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find the specified location. Try another search!', undefined)
        }
        else{
            const features = body.features
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode