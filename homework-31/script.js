// #1 За допомогою ajax-запиту вивести погоду
//
// http://api.openweathermap.org/data/2.5/weather?q=LVIV&units=metric&APPID=5d066958a60d315387d9492393935c19
// q=XXX - місто, для якого показати погоду

// Вводимо в інпут назву міста, натискаємо кнопку Погода
// Якщо таке місто не існує (404), виводимо напис, що таке місце не знайдено
// Якщо місто існує, виводимо наступну інформацію:
// temp – температура
// pressure - тиск
// description – опис
// humidity – вологість
// speed – швидкість вітру
// deg - напрям у градусах
// icon - значок, де 10d код іконки (виводимо картинку з таким урлом, як нам повернувся)
// http://openweathermap.org/img/w/10d.png

const cityNameInpt = document.getElementById('inputCityName');
const result = document.getElementById('result');
const getBtn = document.getElementById('GetWeatherBtn');

getBtn.addEventListener('click', async (e)=> {
    const cityName = cityNameInpt.value;
    const data = await GetWeather(cityName)
    if(!data){
        result.innerHTML = "Error";
        return;
    }
     if (data.cod == "404") {
        result.innerHTML = data.message;
        return;
    }
    result.innerHTML = `
        <h3>${data.name}</h3>

        <p>temp: ${data.main.temp} °C</p>

        <p>pressure: ${data.main.pressure}</p>

        <p>description: ${data.weather[0].description}</p>

        <p>humidity: ${data.main.humidity}%</p>

        <p>speed: ${data.wind.speed}</p>

        <p>deg: ${data.wind.deg}°</p>

        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
    `;

})


async function GetWeather(name){
    if(!name){
       return null; 
    }
    const cityName = name.toUpperCase();
   
    try{
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=5d066958a60d315387d9492393935c19`);
        const data = await response.json();
        return data
    }
    catch(error)
    {
        console.log(error)
        return null; 
    }
}
        
  