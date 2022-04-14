let displayLocation = document.getElementById("displayLocation");

const paris_france = [48.86,2.35];
const london_uk = [51.51,-0.13];
const bejing_china = [39.90,116.41];
const tokyo_japan = [35.69,139.69];
const taipei_taiwan = [25.03,121.57];

let lon = 0;
let lat = 0;

document.getElementById("retLocationButton").onclick = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position) {

            lat = position.coords.latitude;
            lon = position.coords.longitude;

            displayLocation.innerHTML = "Current Location: Latitude: " + lat.toFixed(4) + ",  Longitude: " + lon.toFixed(4);

        })
    }
    else{
        displayLocation.innerHTML = "This browser does not support getting geo location";
    }


}



async function getWeather() {

    let url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=0fc1ec3bf4c4956375b1399129d42c3f";

    try {
        let response = await fetch(url);
        return await response.json();
    }

    catch (error){
        console.log(error);
    }

}


async function renderWeather() {

    let weatherData = await getWeather();
    let mainWeatherCon = weatherData.weather[0].main;
    let temp = weatherData.main.temp;
    let humidity = weatherData.main.humidity;
    let wind_speed = weatherData.wind.speed;
    console.log(mainWeatherCon);
    console.log("Current Tempurature: " + kelvinToFarenheit(temp) + " F");
    console.log("Humidity: " + humidity + "%");

}


function kelvinToFarenheit(tempurature){
    return ((((tempurature - 273.15) * 9) / 5) + 32).toFixed(2);
}