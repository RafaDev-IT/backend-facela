const { body, param, query, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const empleadoValidationRules = () => {
  return [
    body('nombre')
      .trim()
      .notEmpty().withMessage('El nombre es requerido')
      .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
      .isString().withMessage('El nombre debe ser texto'),
    
    body('edad')
      .notEmpty().withMessage('La edad es requerida')
      .isInt({ min: 1 }).withMessage('La edad debe ser un número entero positivo'),
    
    body('puesto')
      .trim()
      .notEmpty().withMessage('El puesto es requerido')
      .isString().withMessage('El puesto debe ser texto'),
    
    body('departamento')
      .trim()
      .notEmpty().withMessage('El departamento es requerido')
      .isString().withMessage('El departamento debe ser texto')
  ];
};

const empleadoUpdateValidationRules = () => {
  return [
    body('nombre')
      .optional()
      .trim()
      .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
      .isString().withMessage('El nombre debe ser texto'),
    
    body('edad')
      .optional()
      .isInt({ min: 1 }).withMessage('La edad debe ser un número entero positivo'),
    
    body('puesto')
      .optional()
      .trim()
      .notEmpty().withMessage('El puesto no puede estar vacío')
      .isString().withMessage('El puesto debe ser texto'),
    
    body('departamento')
      .optional()
      .trim()
      .notEmpty().withMessage('El departamento no puede estar vacío')
      .isString().withMessage('El departamento debe ser texto')
  ];
};

const idParamValidation = () => {
  return [
    param('id')
      .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo')
  ];
};

const filterValidationRules = () => {
  return [
    query('edadMin')
      .optional()
      .isInt({ min: 0 }).withMessage('edadMin debe ser un número entero positivo'),
    
    query('edadMax')
      .optional()
      .isInt({ min: 0 }).withMessage('edadMax debe ser un número entero positivo'),
    
    query('puesto')
      .optional()
      .trim()
      .isString().withMessage('El puesto debe ser texto'),
    
    query('departamento')
      .optional()
      .trim()
      .isString().withMessage('El departamento debe ser texto')
  ];
};

module.exports = {
  handleValidationErrors,
  empleadoValidationRules,
  empleadoUpdateValidationRules,
  idParamValidation,
  filterValidationRules
};