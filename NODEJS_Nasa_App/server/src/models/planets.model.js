const parse = require("csv-parse");
const fs = require('fs');

const habitablePlanets = [];

function isHabitablePlanet(planet)
{
    return planet['koi_dispostion'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 
}