require('dotenv').config();
const seedEmpleados = require('./src/seeders/empleados.seeder');

console.log('🚀 Ejecutando seeders...\n');

// Ejecutar seeder de empleados
seedEmpleados();

console.log('🎉 Todos los seeders completados!');
process.exit(0);