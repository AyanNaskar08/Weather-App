const cityInput=document.querySelector('.city-input')
const searchBtn=document.querySelector('.search-btn')

const wheatherInfoSection=document.querySelector('.weather-info')
const notFoundSection=document.querySelector('.not-found')
const searchCitySection=document.querySelector('.search-city')

const countryTxt =document.querySelector('.country-txt')
const tempTxt =document.querySelector('.temp-txt')
const conditionTxt =document.querySelector('.condition-txt')
const humidityValueTxt =document.querySelector('.humidity-value-txt')
const windValueTxt =document.querySelector('.wind-value-txt')
const weatherSummaryImg =document.querySelector('.weather-summary-img')
const currentDateTxt =document.querySelector('.current-date-txt')


const apikey = '77f49ec8f6cca0e3614549743dd38cd0'

searchBtn.addEventListener('click', () =>{
    if(cityInput. value .trim() != ''){
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
        cityInput.blur ()
    }
})

cityInput.addEventListener('keydown', (event) =>{
    if(event.key =='Enter' &&
        cityInput.value.trim() != ''
    ){
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
        cityInput.blur ()
    }
})

async function getFetchData(endPoint, city){
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=` + apikey;

   const response =await fetch(apiUrl)

   return response.json()
}


function getWeatherIcon( id ){
    if(id <= 232) return 'thunderstorm.svg'
    if(id <= 321) return 'drizzle.svg'
    if(id <= 531) return 'rain.svg'
    if(id <= 622) return 'snow.svg'
    if(id <= 781) return 'atmosphere.svg'
    if(id <= 800) return 'clear.svg'
    else return 'clouds.svg'
}

function getCurrentDate(){
    const getCurrentDate=new Date()
    const options={
        weekday:'short',
        day:'2-digit',
        month:'short'
    }

    return getCurrentDate.toLocaleDateString('en-GB',options)
}


async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city);

    if (weatherData.cod != 200) {
        showDisplaySection(notFoundSection);
        return;
    }

    

    const{
        name: country,
        main:{ temp , humidity},
        weather:[{ id , main}],
        wind:{speed}

    }= weatherData

    countryTxt.textContent=country
    tempTxt.textContent=Math.round(temp) + '°C'
    conditionTxt.textContent= main
    humidityValueTxt.textContent=humidity + '%'
    windValueTxt.textContent= speed + 'M/s'

   
    currentDateTxt.textContent=getCurrentDate()
   
   
    weatherSummaryImg.src=`assets/weather/${getWeatherIcon(id)}`


    await updateForecastInfo(city)

    showDisplaySection(wheatherInfoSection);
}

async function updateForecastInfo(city){
    const forecastsData=await getFetchData('forecast', city)

    const timeTaken='12:00:00'
    const todayDate=new Date().toISOString().split('T')[0]

    // Added a check to ensure forecastsData.list is defined before attempting to iterate
    if (forecastsData && forecastsData.list) {
        forecastsData.list.forEach(forecastWeather =>{
            if(forecastWeather.dt_txt.includes(timeTaken)){
               console.log(forecastWeather)
            }

        })
    } else {
        // Handle the case where forecastsData or forecastsData.list is undefined
        console.error("Forecast data or list is undefined.");
        // Potentially display an error message to the user or take other action
    }

}

function showDisplaySection(section){
    [wheatherInfoSection, searchCitySection, notFoundSection]
      .forEach(section => section.style.display ='none') // Corrected Style to style

      section.style.display = 'flex' // Corrected Style to style
}

      
      
          

