const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleados.controller');
const { 
  empleadoValidationRules, 
  handleValidationErrors 
} = require('../utils/validators');

router.post('/', 
  empleadoValidationRules(),
  handleValidationErrors,
  empleadosController.crearEmpleado
);

module.exports = router;