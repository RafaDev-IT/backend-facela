const express = require('express');
const router = express.Router();
const estadisticasController = require('../controllers/estadisticas.controller');

// Importar documentación Swagger
require('./estadisticas.swagger');

router.get('/', estadisticasController.obtenerEstadisticas);

module.exports = router;