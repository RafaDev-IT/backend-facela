const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
🚀 Servidor corriendo en puerto ${PORT}
📚 Documentación Swagger disponible en: http://localhost:${PORT}/api-docs
  `);
});