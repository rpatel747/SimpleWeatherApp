let displayLocation = document.getElementById("displayLocation");

const citiesMap = new Map();
citiesMap.set("paris_france", ["Paris, France" ,[48.86,2.35]]);
citiesMap.set("london_uk" , ["London, UK",[51.51,-0.13]]);
citiesMap.set("bejing_china" , ["Bejing, China",[39.90,116.41]]);
citiesMap.set("tokyo_japan" , ["Tokyo, Japan",[35.69,139.69]]);
citiesMap.set("taipei_taiwan" , ["Taipei, Taiwan",[25.03,121.57]]);
citiesMap.set("newYorkCity_usa" , ["New York City, USA",[40.7128,-73.935242]]);
citiesMap.set("hongKong_china" , ["Hong Kong, China",[22.3193,114.1694]]);
citiesMap.set("dubai_UAE" , ["Dubai, UAE",[25.2048,55.2708]]);
citiesMap.set("rome_italy" , ["Rome, Italy",[41.9028,12.4964]]);
citiesMap.set("istanbul_turkey" , ["Istanbul, Turkey",[41.0082,28.9784]]);
citiesMap.set("mexicoCity_mexico" , ["Mexico City, Mexico",[19.4326,99.1332]]);
citiesMap.set("moscow_russia" , ["Moscow, Russia",[55.7558,37.6173]]);
citiesMap.set("sanFrancisco_USA" , ["San Francisco, USA",[37.7749,122.4194]]);
citiesMap.set("losAngeles_USA" , ["Los Angeles, USA",[34.0522,118.2437]]);
citiesMap.set("chicago_USA" , ["Chicago, USA",[41.8781,87.6298]]);
citiesMap.set("barcelona_spain" , ["Barcelona, USA",[87.6298,2.1686]]);
citiesMap.set("madrid_spain" , ["Madrid, Spain",[40.4168,3.7038]]);
citiesMap.set("sydney_australia" , ["Sydney, Australia",[33.8688,151.2093]]);
citiesMap.set("lisbon_portugal" , ["Lisbon, Portugal",[38.7223,9.1393]]);
citiesMap.set("vienna_austria" , ["Vienna, Austria",[48.2082,16.3738]]);


let lon = 0;
let lat = 0;
var searchCityName;


document.getElementById("retLocationButton").onclick = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position) {

            lat = position.coords.latitude;
            lon = position.coords.longitude;

            displayLocation.innerHTML = "Current Location: Latitude: " + lat.toFixed(4) + ",  Longitude: " + lon.toFixed(4);

            let searchCityName = document.getElementById('searchCityName');
            searchCityName.innerHTML = "Your Current Location";

            getWeather();
            renderWeather();
        })
    }
    else{
        displayLocation.innerHTML = "This browser does not support getting geo location";
    }


}


document.getElementById("getWeather").onclick = () => {

    let cityName = document.getElementById("cityName");

    let searchCityName = document.getElementById('searchCityName');
    
    if(cityName == "null"){
        alert("Please choose a city from the list below.");
    }


    let city_coords = citiesMap.get(cityName.value);
    lat = city_coords[1][0];
    lon = city_coords[1][1];

    searchCityName.innerHTML = city_coords[0];

    getWeather();
    renderWeather();

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

    let convertedTemp = kelvinToFarenheit(temp);

    let weatherIcon = document.getElementById("weatherIcon");
    let weatherTemp = document.getElementById("weatherTemp");
    let weatherHumidity = document.getElementById("weatherHumidity");
    let weatherWindSpeed = document.getElementById("weatherWindSpeed");


    if(convertedTemp > 90){
        weatherIcon.innerHTML = "🌡️";

    }

    else if(convertedTemp < 90 && convertedTemp >70){
        weatherIcon.innerHTML = "☀️";
    }

    else if(convertedTemp > 40){
        weatherIcon.innerHTML = "🌤️";
    }

    else if(convertedTemp > -10 && convertedTemp < 30){

        weatherIcon.innerHTML = "❄️";

    }

    weatherTemp.innerHTML = "Tempurature: " + convertedTemp + " F";
    weatherHumidity.innerHTML = "Humitidy: " + humidity;
    weatherWindSpeed.innerHTML = "Wind Speed: " + wind_speed;

}


function kelvinToFarenheit(tempurature){
    return ((((tempurature - 273.15) * 9) / 5) + 32).toFixed(2);
}



window.onload = async function setTopFiveCities() {
    let cityData = [citiesMap.get("newYorkCity_usa"),
                    citiesMap.get("london_uk"),
                    citiesMap.get("tokyo_japan"),
                    citiesMap.get("sydney_australia"),
                    citiesMap.get("paris_france")
    ];

    
    for(i=0;i<5;i++){

        lat = (cityData[i])[1][0];
        lon = (cityData[i])[1][1];


        getWeather();
        let weatherData = await getWeather();

        var card = document.createElement('div');
        card.className = "weatherCard";
        
        var cityName = document.createElement('h4');
        cityName.innerHTML = (cityData[i])[0];

        var temp = document.createElement('h4');
        temp.innerHTML = "Tempureature: "+ kelvinToFarenheit(weatherData.main.temp) + " F";

        var humitidy = document.createElement('h4');
        humitidy.innerHTML = "Humidity: "+ weatherData.main.humidity;

        var windSpeed = document.createElement('h4');
        windSpeed.innerHTML = "Wind Speed: " + weatherData.wind.speed

        card.appendChild(cityName);
        card.appendChild(temp);
        card.appendChild(humitidy);
        card.appendChild(windSpeed);

        document.getElementById('topFiveList').appendChild(card);
        console.log(card);



    }



}