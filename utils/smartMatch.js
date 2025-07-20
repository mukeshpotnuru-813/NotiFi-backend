// utils/smartMatch.js
function getClosestForecast(forecastList, targetDateTime) {
  const targetTime = new Date(targetDateTime).getTime();

  let closest = null;
  let minDiff = Infinity;

  for (let item of forecastList) {
    const itemTime = new Date(item.dt_txt).getTime();
    const diff = Math.abs(targetTime - itemTime);

    if (diff < minDiff) {
      minDiff = diff;
      closest = item;
    }
  }

  return closest;
}

module.exports = getClosestForecast;
