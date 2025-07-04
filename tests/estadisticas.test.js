const request = require('supertest');
const app = require('../src/app');

describe('Estadísticas API Tests', () => {
  describe('GET /estadisticas', () => {
    it('debería devolver estadísticas vacías cuando no hay empleados', async () => {
      const response = await request(app)
        .get('/estadisticas')
        .expect(200);

      expect(response.body.message).toBe('Estadísticas obtenidas exitosamente');
      expect(response.body.data).toEqual({
        totalEmpleados: 0,
        promedioEdad: 0,
        cantidadPorPuesto: {},
        cantidadPorDepartamento: {}
      });
    });

    it('debería calcular estadísticas correctamente con empleados', async () => {
      // Agregar empleados de prueba
      const empleados = [
        { nombre: 'Ana López', edad: 25, puesto: 'Desarrollador', departamento: 'Tecnología' },
        { nombre: 'Carlos Ruiz', edad: 35, puesto: 'Desarrollador', departamento: 'Tecnología' },
        { nombre: 'Diana Martín', edad: 30, puesto: 'Contadora', departamento: 'Contabilidad' },
        { nombre: 'Eduardo Silva', edad: 40, puesto: 'Gerente', departamento: 'Ventas' },
        { nombre: 'Fernanda Torres', edad: 20, puesto: 'Junior', departamento: 'Tecnología' }
      ];

      for (const emp of empleados) {
        await request(app).post('/empleados').send(emp);
      }

      const response = await request(app)
        .get('/estadisticas')
        .expect(200);

      expect(response.body.data).toEqual({
        totalEmpleados: 5,
        promedioEdad: 30,
        cantidadPorPuesto: {
          'Desarrollador': 2,
          'Contadora': 1,
          'Gerente': 1,
          'Junior': 1
        },
        cantidadPorDepartamento: {
          'Tecnología': 3,
          'Contabilidad': 1,
          'Ventas': 1
        }
      });
    });

    it('debería redondear correctamente el promedio de edad', async () => {
      const empleados = [
        { nombre: 'Empleado 1', edad: 25, puesto: 'Dev', departamento: 'IT' },
        { nombre: 'Empleado 2', edad: 26, puesto: 'Dev', departamento: 'IT' },
        { nombre: 'Empleado 3', edad: 27, puesto: 'Dev', departamento: 'IT' }
      ];

      for (const emp of empleados) {
        await request(app).post('/empleados').send(emp);
      }

      const response = await request(app)
        .get('/estadisticas')
        .expect(200);

      expect(response.body.data.promedioEdad).toBe(26);
    });
  });
});