const mainData = document.querySelector('.main-data');

const searchBar = document.querySelector(`input[placeholder = 'Find your location']`)

//onloading by default **Cairo
window.addEventListener('load', displayWeather)

//oninput data in search 
searchBar.addEventListener('input', displayWeather)


//Fetch weather data
async function getWeather(searchKey) {
    try {
        var weatherApiData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1a9eb06f0fb54f34b37100757241106&q=${searchKey}&days=3`)

        if (weatherApiData.ok) {
            return await weatherApiData.json();
        }
    }
    catch (error) {
       mainData.querySelectorAll('div')[0].innerHTML += `<h1 class='text-muted-lg'>Fail to obtain data, Please use established connection</h1>` 
    }
}

//Display data on screen
async function displayWeather(){
    
    let searchItem = '';

    if(searchBar.value != ''){
        searchItem = searchBar.value
    }
    else{
        searchItem = 'Cairo'
    }

    const weatherData = await getWeather(searchItem);
    const firstDay = weatherData.current;
    const firstDayDate = firstDay.last_updated.split(' ')[0].split('-');
    const stringDate = getStringDate(firstDayDate[0], firstDayDate[1], firstDayDate[2]);

    const weatherDays = weatherData.forecast.forecastday;

    let htmlText = ``
    htmlText = `
            <div class="col-md-4 p-0">
                   <div class="temp">
                       <div class="temp-header  text-muted-lg d-flex justify-content-between p-2">
                           <p class="m-0">${stringDate[1]}</p>
                           <p class="m-0">${firstDayDate[2]} ${stringDate[0]}</p>
                       </div>
                       <div class="body py-5 px-3 text-muted-lg">
                           <p class="fs-5">${weatherData.location.name}</p>
                           <h3 class="fw-bolder">${firstDay.temp_c}<sup>o</sup>C</h3>
                           <img src=https:${firstDay.condition.icon} alt="" width="90">
                           <p class="mode">${firstDay.condition.text}</p>
                           <span class="weather-info me-3">
                               <img src="imgs/icon-umberella.png" alt="humidity img">
                               ${firstDay.humidity}%
                           </span>
                           <span class="weather-info me-3">
                               <img src="imgs/icon-wind.png" alt="wind img">
                               ${firstDay.wind_kph}km/h
                           </span>
                           <span class="weather-info me-3">
                               <img src="imgs/icon-compass.png" alt="direction img">
                               ${firstDay.wind_dir}
                           </span>
                       </div>
                   </div>
               </div>`

    for (let i = 1; i < weatherDays.length; i++) {
        const dayDate = weatherDays[i].date.split('-');
        const stringDate = getStringDate(dayDate[0], dayDate[1], dayDate[2]);

        htmlText += `<div class="col-md-4 p-0">
                <div class="temp">
                    <div class="temp-header text-center text-muted-lg p-2">
                        <p class="m-0">${stringDate[1]}</p>
                    </div>
                    <div class="body text-muted-lg remaining">
                        <img src="https:${weatherDays[i].day.condition.icon}" alt="" width="48">
                        <div class="sec-temp text-center">
                            <h2 class="fw-bolder text-white m-0">${weatherDays[i].day.maxtemp_c}<sup>o</sup>C</h2>
                            <h4>${weatherDays[i].day.mintemp_c}<sup>o</sup></h4>
                        </div>
                        <p class="mode">${weatherDays[i].day.condition.text}</p>
                    </div>
                </div>
            </div>`

    }

    mainData.innerHTML = htmlText;

    const middleChild = mainData.querySelectorAll('.col-md-4')[1];
    const midCard = middleChild.querySelectorAll('.temp')[0];
    const midHeader = middleChild.querySelectorAll('.temp-header')[0];

    midCard.classList.add('mid');
    midHeader.classList.add('mid');

    console.log(weatherData);


}

//Get days and months names
function getStringDate(year, month, day) {
    const date = new Date(year, month - 1, day);
    const monthname = date.toLocaleString('default', { month: 'long' });
    const weekday = date.toLocaleString('default', { weekday: 'long' });
    return [monthname, weekday];
}






