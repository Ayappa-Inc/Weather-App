console.log("JS File Loaded")
let weatherForm = document.querySelector('form')
let search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let searchMsg = document.querySelector('#search-msg')
    let weatherLocation = document.querySelector('#weather-location')

    let weatherDescription = document.querySelector('#weather-description')
    let weatherTemperatureStatement = document.querySelector('#weather-temperature_statement')

    let weatherPrecipitation = document.querySelector('#weather-precipitation')

    document.querySelector("link[rel='icon']").href = "./img/weather.png";
    document.getElementById("weather-img").src = "./img/weather.png";

    searchMsg.textContent = 'Loading...'
    let location = search.value

    weatherLocation.textContent = ""
    weatherDescription.textContent = ""

    weatherTemperatureStatement.textContent = "Temperature:" 
    weatherPrecipitation.textContent = "Chance of Precipitation:"

    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
        response.json().then((data) => {

            searchMsg.textContent = data.msg

            document.querySelector("link[rel='icon']").href = data.img_link;
            document.getElementById("weather-img").src = data.img_link;

            if (data.error) {
                console.log(data.error)
            } else {

                weatherLocation.textContent = data.weather.location

                weatherDescription.textContent = data.weather.weather_description

                weatherTemperatureStatement.textContent = "Temperature:" + data.weather.temperature_statement

                weatherPrecipitation.textContent = "Chance of Precipitation:" + data.weather.precipitation

            }
        })
    })
    console.log(location)
})