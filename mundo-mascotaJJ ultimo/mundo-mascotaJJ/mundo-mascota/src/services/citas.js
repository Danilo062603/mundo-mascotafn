const fs   = require('fs');
const path = require('path');

const ruta = path.join(__dirname, '../data/citas.json');

const leer    = ()       => JSON.parse(fs.readFileSync(ruta, 'utf-8'));
const guardar = (citas)  => fs.writeFileSync(ruta, JSON.stringify(citas, null, 2));

module.exports = { leer, guardar };
