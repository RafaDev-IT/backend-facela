const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleados.controller');
const { 
  empleadoValidationRules, 
  handleValidationErrors,
  filterValidationRules
} = require('../utils/validators');

router.post('/', 
  empleadoValidationRules(),
  handleValidationErrors,
  empleadosController.crearEmpleado
);

router.get('/',
  filterValidationRules(),
  handleValidationErrors,
  empleadosController.obtenerEmpleados
);

module.exports = router;