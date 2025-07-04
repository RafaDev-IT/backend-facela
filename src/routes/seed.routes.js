const express = require('express');
const router = express.Router();
const seedController = require('../controllers/seed.controller');

// Importar documentación Swagger
require('./seed.swagger');

router.post('/', seedController.ejecutarSeed);

module.exports = router;