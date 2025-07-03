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

router.put('/:id',
  idParamValidation(),
  empleadoUpdateValidationRules(),
  handleValidationErrors,
  empleadosController.actualizarEmpleado
);

module.exports = router;