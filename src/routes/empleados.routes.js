const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleados.controller');
const { 
  empleadoValidationRules, 
  handleValidationErrors,
  filterValidationRules,
  empleadoUpdateValidationRules,
  idParamValidation
} = require('../utils/validators');

// Importar documentación Swagger
require('./empleados.swagger');

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

router.get('/mayores',
  empleadosController.obtenerEmpleadosMayores
);

router.get('/:id',
  idParamValidation(),
  handleValidationErrors,
  empleadosController.obtenerEmpleadoPorId
);

router.put('/:id',
  idParamValidation(),
  empleadoUpdateValidationRules(),
  handleValidationErrors,
  empleadosController.actualizarEmpleado
);

router.delete('/:id',
  idParamValidation(),
  handleValidationErrors,
  empleadosController.eliminarEmpleado
);

module.exports = router;