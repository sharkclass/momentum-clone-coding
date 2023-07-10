const API_KEY="1d25e34470ae6f085f42f40d277689c2";

function onGeoOk(position){
    const lat=position.coords.latitude;
    const lon=position.coords.longitude;
    const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    //url 끝에 &units=metric을 추가해 온도를 섭씨로 바꿈
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
        //const weather=document.querySelector("#weather-container span:first-child")
        const icon=document.querySelector("#weather-icon")
        const city=document.querySelector("#weather-city")
        const temperatureNumber=document.querySelector("#temperature__number");
        //weather.innerText=data.weather[0].main;
        icon.src=`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        icon.alt=data.weather[0].description;
        temperatureNumber.innerText=`${parseInt(data.main.temp)}`
        city.innerText=`${data.name}`;
    });
}

function onGeoError(){
    alert("Can't find you. No weather find you.")
}

navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);