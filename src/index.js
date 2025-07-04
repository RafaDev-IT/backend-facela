require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const empleadosRoutes = require('./routes/empleados.routes');
const estadisticasRoutes = require('./routes/estadisticas.routes');
const loggerMiddleware = require('./middleware/logger.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(loggerMiddleware);

app.get('/', (req, res) => {
  res.json({ message: 'API REST Empleados' });
});

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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});