let displayLocation = document.getElementById("displayLocation");

const citiesMap = new Map();
citiesMap.set("paris_france", [48.86,2.35]);
citiesMap.set("london_uk" , [51.51,-0.13]);
citiesMap.set("bejing_china" , [39.90,116.41]);
citiesMap.set("tokyo_japan" , [35.69,139.69]);
citiesMap.set("taipei_taiwan" , [25.03,121.57]);
citiesMap.set("newYorkCity_usa" , [40.7128,74.0060]);
citiesMap.set("hongKong_china" , [22.3193,114.1694]);
citiesMap.set("dubai_UAE" , [25.2048,55.2708]);
citiesMap.set("rome_italy" , [41.9028,12.4964]);
citiesMap.set("istanbul_turkey" , [41.0082,28.9784]);
citiesMap.set("mexicoCity_mexico" , [19.4326,99.1332]);
citiesMap.set("moscow_russia" , [55.7558,37.6173]);
citiesMap.set("sanFrancisco_USA" , [37.7749,122.4194]);
citiesMap.set("losAngeles_USA" , [34.0522,118.2437]);
citiesMap.set("chicago_USA" , [41.8781,87.6298]);
citiesMap.set("barcelona_spain" , [87.6298,2.1686]);
citiesMap.set("madrid_spain" , [40.4168,3.7038]);
citiesMap.set("sydney_australia" , [33.8688,151.2093]);
citiesMap.set("lisbon_portugal" , [38.7223,9.1393]);
citiesMap.set("vienna_austria" , [48.2082,16.3738]);


let lon = 0;
let lat = 0;
var searchCityName;


document.getElementById("retLocationButton").onclick = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position) {

            lat = position.coords.latitude;
            lon = position.coords.longitude;

            displayLocation.innerHTML = "Current Location: Latitude: " + lat.toFixed(4) + ",  Longitude: " + lon.toFixed(4);


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
    
    if(cityName == "null"){
        alert("Please choose a city from the list below.");
    }


    let city_coords = citiesMap.get(cityName.value);
    lat = city_coords[0];
    lon = city_coords[1];

    getWeather();
    renderWeather();

}



async function getWeather() {

     // Use your open weather api url here
    let url =;
    

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

    weatherTemp.innerHTML = convertedTemp + " F";
    weatherHumidity.innerHTML = humidity;
    weatherWindSpeed.innerHTML = wind_speed;

}


function kelvinToFarenheit(tempurature){
    return ((((tempurature - 273.15) * 9) / 5) + 32).toFixed(2);
}



window.onload = async function setTopFiveCities() {
    let cityData = [
                    ["New York City, USA",citiesMap.get("newYorkCity_usa")], 
                    ["London, UK",citiesMap.get("london_uk")],
                    ["Tokyo, Japan",citiesMap.get("tokyo_japan")],
                    ["Sydney, Australia",citiesMap.get("sydney_australia")],
                    ["Paris, France",citiesMap.get("paris_france")]
    ];

    
    for(i=0;i<5;i++){

        lat = (cityData[i][1])[0];
        lon = (cityData[i][1])[1];

        getWeather();
        let weatherData = await getWeather();

        var card = document.createElement('div');
        card.className = "weatherCard";
        
        var cityName = document.createElement('h2');
        cityName.innerHTML = cityData[i][0];

        var temp = document.createElement('h2');
        temp.innerHTML = (kelvinToFarenheit(weatherData.main.temp)) + " F";

        var humitidy = document.createElement('h2');
        humitidy.innerHTML = weatherData.main.humidity;

        var windSpeed = document.createElement('h2');
        windSpeed.innerHTML = weatherData.wind.speed

        card.appendChild(cityName);
        card.appendChild(temp);
        card.appendChild(humitidy);
        card.appendChild(windSpeed);

        document.getElementById('topFiveList').appendChild(card);
        console.log(card);



    }



}
