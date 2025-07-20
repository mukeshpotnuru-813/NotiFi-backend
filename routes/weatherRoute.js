const express = require('express');
const router = express.Router();
const getWeatherForecast = require('../utils/weatherFetcher');
const getClosestForecast = require('../utils/smartMatch');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, async (req, res) => {
  const { city, date, time } = req.query;

  if (!city || !date || !time)
    return res.status(400).json({ error: 'city, date, and time are required' });

  const weatherData = await getWeatherForecast(city);
  if (!weatherData) return res.status(500).json({ error: 'Could not fetch weather' });

  const targetDateTime = `${date} ${time}`;
  const closest = getClosestForecast(weatherData.list, targetDateTime);

  if (!closest)
    return res.status(404).json({ error: 'No forecast found for this time' });

  res.json({
    city: weatherData.city.name,
    matched_time: closest.dt_txt,
    temperature: closest.main.temp,
    condition: closest.weather[0].description,
    wind_speed: closest.wind.speed
  });
});

module.exports = router;
