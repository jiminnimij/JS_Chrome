const API_KEY = "abe96f271a4aa837aec97ece97066395"

function onGeoOk(position){
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  fetch(url).then(response => response.json()).then(data => {
    const weather = document.querySelector("#weather span:first-child");
    const city = document.querySelector("#weather span:last-child")
    city.innerText = data.name;
    const cloud = "☁️";
    const sun = "☀️";
    const rain = "🌧️";
    const snow = "🌨️";
    const mist = "🌫️";
    let weatherEmoji;
    if(data.weather[0].main == "Clouds"){
      weatherEmoji =  cloud;
    } else if (data.weather[0].main == "Rains"){
      weatherEmoji = rain;
    } else if (data.weather[0].main == "Snows"){
      weatherEmoji = snow;
    } else if (data.weather[0].main == "Mists"){
      weatherEmoji = mist;
    } else{
      weatherEmoji = sun;
    }
    weather.innerText = `${data.weather[0].main} ${weatherEmoji} / ${data.main.temp}℃`;
  });
}

function onGeoError(){
  alert("Can't find you. No Weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);