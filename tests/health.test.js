const request = require('supertest');
const app = require('../src/app');

describe('Health & Root Endpoints Tests', () => {
  describe('GET /', () => {
    it('debería devolver mensaje de bienvenida', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body).toEqual({
        message: 'API REST Empleados'
      });
    });
  });

  describe('GET /health', () => {
    it('debería devolver estado OK con toda la información', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBe('OK');
      expect(response.body.message).toBe('API funcionando correctamente');
      expect(response.body.timestamp).toBeDefined();
      expect(response.body.uptime).toBeDefined();
      expect(response.body.uptime).toBeGreaterThan(0);
      expect(response.body.environment).toBeDefined();
      expect(response.body.version).toBe('1.0.0');
    });
  });

  describe('404 Handler', () => {
    it('debería devolver 404 para rutas no existentes', async () => {
      const response = await request(app)
        .get('/ruta-no-existe')
        .expect(404);

      expect(response.body.message).toBe('Ruta no encontrada');
      expect(response.body.error).toContain('GET /ruta-no-existe no existe');
    });

    it('debería manejar diferentes métodos HTTP', async () => {
      const response = await request(app)
        .post('/endpoint-inexistente')
        .expect(404);

      expect(response.body.error).toContain('POST /endpoint-inexistente no existe');
    });
  });
});