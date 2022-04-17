import request from 'request'

export default function getGeoCode(location, callback) {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(location) + ".json?access_token="+process.env.GEO_CODE_API_KEY+"&limit=1"
    request({ url, json: true }, (err, {body}) => {
        if (err) {
            callback("Unable To Connect to Weather Services", undefined)
        }
        else if (body.features.length === 0) {
            callback("Unable to Find Location Try another Search", undefined)
        }
        else {
            const data = {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}