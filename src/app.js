require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const empleadosRoutes = require('./routes/empleados.routes');
const estadisticasRoutes = require('./routes/estadisticas.routes');
const seedRoutes = require('./routes/seed.routes');
const loggerMiddleware = require('./middleware/logger.middleware');
const { specs, swaggerUi } = require('./config/swagger');

const app = express();

app.use(cors());
app.use(express.json());

// Solo usar morgan si no estamos en tests
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
  app.use(loggerMiddleware);
}

// Configurar Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "API Empleados - Documentación"
}));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Endpoint raíz de la API
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Mensaje de bienvenida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: API REST Empleados
 */
app.get('/', (req, res) => {
  res.json({ message: 'API REST Empleados' });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: 🟢 Verificar estado de la API
 *     description: Endpoint adicional para monitoreo y estado del servicio
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Estado del servicio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: API funcionando correctamente
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-01-15T10:30:00.000Z
 *                 uptime:
 *                   type: number
 *                   example: 3600
 *                 environment:
 *                   type: string
 *                   example: development
 *                 version:
 *                   type: string
 *                   example: 1.0.0
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

app.use('/empleados', empleadosRoutes);
app.use('/estadisticas', estadisticasRoutes);
app.use('/seed', seedRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada',
    error: `La ruta ${req.method} ${req.path} no existe`
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'production' ? 'Error procesando la solicitud' : err.message
  });
});

module.exports = app;