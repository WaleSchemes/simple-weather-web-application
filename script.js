

async function getWeather() {
    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=Lagos&appid=93ddcf50ee1c43e18d1114137242103');
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        const forecast = data.list;

        const weatherContainer = document.getElementById('weather');

        forecast.forEach(day => {
            const date = new Date(day.dt * 1000);
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
            const temperature = Math.round(day.main.temp);
            const description = day.weather[0].description;
    
            const weatherCard = document.createElement('div');
            weatherCard.classList.add('weather-card');
            weatherCard.innerHTML = `
                <p><strong>${dayOfWeek}</strong></p>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${description}</p>
            `;
    
            weatherContainer.appendChild(weatherCard);
        }); // <-- Add this closing brace for the forEach loop
    } catch (error) {
        console.error(error);
    }
}

// Call the getWeather function after the DOM content is loaded
document.addEventListener('DOMContentLoaded', getWeather);
