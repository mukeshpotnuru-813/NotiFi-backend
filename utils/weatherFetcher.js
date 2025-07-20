const axios = require('axios');

async function getWeatherForecast(city) {
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
      params: {
        q: city,
        units: 'metric',
        appid: apiKey,
      }
    });

    return res.data;
  } catch (error) {
    console.error('Weather API error:', error.message);
    return null;
  }
}

module.exports = getWeatherForecast;
