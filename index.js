// const API_KEY = "7f33f271b41d457dc670d401e2e2bd41";

const container  = document.querySelector(".container");
const search  = document.querySelector(".search-box button");
const error404 = document.querySelector(".not-found")
const weatherBox  = document.querySelector(".weather-box");
const weatherDetails  = document.querySelector(".weather-details");

search.addEventListener('click', () => {
    const API_KEY = "7f33f271b41d457dc670d401e2e2bd41";
    const city = document.querySelector(".search-box input").value;

    if (city === "") {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);

        if(data.cod === '404'){
            container.style.height = '400px';
            weatherBox.style.display = "none";
            weatherDetails.style.display = "none";
            error404.style.display = "block";
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = "none";
        error404.classList.remove("fadeIn");

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind-speed span');

        switch(data.weather[0].main){
            
            case 'Clear':
            image.src = './Assets/clear.png'
            break;

            case 'Rain':
            image.src = './Assets/rain.png'
            break;

            case 'Snow':
            image.src = './Assets/snow.png'
            break;

            case 'Clouds':
            image.src = './Assets/cloud.png'
            break;

            case 'Haze':
            image.src = './Assets/mist.png'
            break;

            case 'Smoke':
            image.src = './Assets/smoke.png'
            break;

            default:
            image.src = ""

        }
        
        temperature.innerHTML = `${+(+(data.main.temp)-273).toFixed(2)}<span>°C</span>`;
        description.innerHTML = `${data.weather[0].description}`;
        humidity.innerHTML = `${+(data.main.humidity)}%`;
        wind.innerHTML = `${+(data.wind.speed)}Km/h`

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px'
    })
})