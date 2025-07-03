const estadisticasService = require('../services/estadisticas.service');

const estadisticasController = {
  obtenerEstadisticas: (req, res) => {
    try {
      const estadisticas = estadisticasService.obtenerEstadisticas();
      res.json({
        message: 'Estadísticas obtenidas exitosamente',
        data: estadisticas
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error al obtener estadísticas',
        error: error.message
      });
    }
  }
};

module.exports = estadisticasController;