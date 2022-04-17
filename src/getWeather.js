import request from 'request'
import dotenv from 'dotenv'

export default function getWeather(data,callback) {

    const {lat,long} = data
    const url = "http://api.weatherstack.com/current?access_key="+process.env.WEATHER_API_KEY+"&units=m&query=" + lat + "," + long
    request({ url, json: true }, (err,{body}) => {
        if(err){
            callback("Unable To Connect to Weather Services",undefined)
        }
        else if(body.error){
            callback("Unable To Get Weather",undefined)
        }
        else{
            const weather_data = {
                img_link: body.current.weather_icons,
                weather_description:"Current Weather is " + body.current.weather_descriptions[0],
                location:"Found Weather Data for location "+ data.location + " at " + body.current.observation_time + " UTC",
                precipitation: "Chance of Precpitation is " + body.current.precip + ".",
                temperature_statement:"It is currently " + body.current.temperature + "°C. It feels outside like " + body.current.feelslike + "°C."                
            }
            callback(undefined,weather_data)
        }
    })
}
