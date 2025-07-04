const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db/database');

describe('Seed Endpoint Tests', () => {
  describe('POST /seed', () => {
    it('debería poblar la base de datos con empleados de ejemplo', async () => {
      const response = await request(app)
        .post('/seed')
        .expect(201);

      expect(response.body.message).toBe('Seed ejecutado exitosamente');
      expect(response.body.logs).toBeDefined();
      expect(response.body.logs).toBeInstanceOf(Array);
      expect(response.body.resumen).toBeDefined();
      expect(response.body.resumen.mensaje).toBe('Base de datos poblada con datos de ejemplo');

      // Verificar que se crearon empleados
      const empleadosResponse = await request(app).get('/empleados');
      expect(empleadosResponse.body.data.length).toBeGreaterThan(0);
    });

    it('debería manejar correctamente cuando ya existen empleados', async () => {
      // Ejecutar seed primera vez
      await request(app).post('/seed');
      
      // Ejecutar seed segunda vez
      const response = await request(app)
        .post('/seed')
        .expect(201);

      expect(response.body.logs.some(log => 
        log.includes('duplicado omitido')
      )).toBe(true);
    });
  });
});