function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function solution(origin) {
  return {
    origin: origin,
    likelihood: getRandomInt(0, 100),
    offer_value: getRandomInt(0, 1000)
  }
}

module.exports = solution;
