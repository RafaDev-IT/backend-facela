const seedEmpleados = require('../seeders/empleados.seeder');

const seedController = {
  ejecutarSeed: (req, res) => {
    try {
      // Capturar los logs del seeder
      const originalLog = console.log;
      const logs = [];
      
      console.log = (message) => {
        logs.push(message);
        originalLog(message);
      };
      
      // Ejecutar seeder
      const resultado = seedEmpleados();
      
      // Restaurar console.log
      console.log = originalLog;
      
      res.status(201).json({
        message: 'Seed ejecutado exitosamente',
        logs: logs,
        resumen: {
          mensaje: 'Base de datos poblada con datos de ejemplo',
          detalles: logs[logs.length - 4] || 'Seed completado'
        }
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error al ejecutar seed',
        error: error.message
      });
    }
  }
};

module.exports = seedController;