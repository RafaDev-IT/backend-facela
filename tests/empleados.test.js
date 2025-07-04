const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db/database');

describe('Empleados API Tests', () => {
  describe('POST /empleados', () => {
    it('debería crear un nuevo empleado con datos válidos', async () => {
      const nuevoEmpleado = {
        nombre: 'Juan Pérez',
        edad: 28,
        puesto: 'Desarrollador',
        departamento: 'Tecnología'
      };

      const response = await request(app)
        .post('/empleados')
        .send(nuevoEmpleado)
        .expect(201);

      expect(response.body.message).toBe('Empleado creado exitosamente');
      expect(response.body.data).toMatchObject(nuevoEmpleado);
      expect(response.body.data.id).toBeDefined();
    });

    it('debería rechazar empleado con nombre duplicado', async () => {
      const empleado = {
        nombre: 'María García',
        edad: 30,
        puesto: 'Gerente',
        departamento: 'Ventas'
      };

      // Crear el primer empleado
      await request(app).post('/empleados').send(empleado);

      // Intentar crear duplicado
      const response = await request(app)
        .post('/empleados')
        .send(empleado)
        .expect(409);

      expect(response.body.message).toBe('Conflicto');
      expect(response.body.error).toBe('Ya existe un empleado con ese nombre');
    });

    it('debería validar campos requeridos', async () => {
      const response = await request(app)
        .post('/empleados')
        .send({})
        .expect(400);

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.length).toBeGreaterThan(0);
    });

    it('debería validar edad positiva', async () => {
      const response = await request(app)
        .post('/empleados')
        .send({
          nombre: 'Test User',
          edad: -5,
          puesto: 'Tester',
          departamento: 'QA'
        })
        .expect(400);

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.some(e => e.path === 'edad')).toBe(true);
    });

    it('debería validar nombre mínimo 3 caracteres', async () => {
      const response = await request(app)
        .post('/empleados')
        .send({
          nombre: 'AB',
          edad: 25,
          puesto: 'Tester',
          departamento: 'QA'
        })
        .expect(400);

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.some(e => e.path === 'nombre')).toBe(true);
    });
  });

  describe('GET /empleados', () => {
    beforeEach(async () => {
      // Agregar empleados de prueba
      const empleados = [
        { nombre: 'Ana López', edad: 25, puesto: 'Desarrollador', departamento: 'Tecnología' },
        { nombre: 'Carlos Ruiz', edad: 35, puesto: 'Gerente', departamento: 'Ventas' },
        { nombre: 'Diana Martín', edad: 28, puesto: 'Contadora', departamento: 'Contabilidad' },
        { nombre: 'Eduardo Silva', edad: 45, puesto: 'Director', departamento: 'Administración' },
        { nombre: 'Fernanda Torres', edad: 32, puesto: 'Desarrollador', departamento: 'Tecnología' }
      ];

      for (const emp of empleados) {
        await request(app).post('/empleados').send(emp);
      }
    });

    it('debería obtener todos los empleados sin filtros', async () => {
      const response = await request(app)
        .get('/empleados')
        .expect(200);

      expect(response.body.message).toBe('Empleados obtenidos exitosamente');
      expect(response.body.data).toHaveLength(5);
      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination.totalItems).toBe(5);
    });

    it('debería aplicar paginación correctamente', async () => {
      const response = await request(app)
        .get('/empleados?page=1&limit=2')
        .expect(200);

      expect(response.body.data).toHaveLength(2);
      expect(response.body.pagination.currentPage).toBe(1);
      expect(response.body.pagination.itemsPerPage).toBe(2);
      expect(response.body.pagination.totalPages).toBe(3);
      expect(response.body.pagination.hasNextPage).toBe(true);
    });

    it('debería filtrar por edad mínima y máxima', async () => {
      const response = await request(app)
        .get('/empleados?edadMin=30&edadMax=35')
        .expect(200);

      expect(response.body.data).toHaveLength(2);
      response.body.data.forEach(emp => {
        expect(emp.edad).toBeGreaterThanOrEqual(30);
        expect(emp.edad).toBeLessThanOrEqual(35);
      });
    });

    it('debería filtrar por puesto', async () => {
      const response = await request(app)
        .get('/empleados?puesto=Desarrollador')
        .expect(200);

      expect(response.body.data).toHaveLength(2);
      response.body.data.forEach(emp => {
        expect(emp.puesto).toBe('Desarrollador');
      });
    });

    it('debería filtrar por departamento', async () => {
      const response = await request(app)
        .get('/empleados?departamento=Tecnología')
        .expect(200);

      expect(response.body.data).toHaveLength(2);
      response.body.data.forEach(emp => {
        expect(emp.departamento).toBe('Tecnología');
      });
    });

    it('debería buscar por nombre', async () => {
      const response = await request(app)
        .get('/empleados?search=ana')
        .expect(200);

      expect(response.body.data).toHaveLength(2); // Ana y Fernanda
      response.body.data.forEach(emp => {
        expect(emp.nombre.toLowerCase()).toContain('ana');
      });
    });

    it('debería combinar múltiples filtros', async () => {
      const response = await request(app)
        .get('/empleados?edadMin=25&edadMax=35&puesto=Desarrollador&departamento=Tecnología')
        .expect(200);

      expect(response.body.data).toHaveLength(2);
      response.body.data.forEach(emp => {
        expect(emp.edad).toBeGreaterThanOrEqual(25);
        expect(emp.edad).toBeLessThanOrEqual(35);
        expect(emp.puesto).toBe('Desarrollador');
        expect(emp.departamento).toBe('Tecnología');
      });
    });
  });

  describe('GET /empleados/mayores', () => {
    beforeEach(async () => {
      const empleados = [
        { nombre: 'Joven Uno', edad: 25, puesto: 'Junior', departamento: 'IT' },
        { nombre: 'Mayor Uno', edad: 35, puesto: 'Senior', departamento: 'IT' },
        { nombre: 'Mayor Dos', edad: 45, puesto: 'Manager', departamento: 'IT' }
      ];

      for (const emp of empleados) {
        await request(app).post('/empleados').send(emp);
      }
    });

    it('debería obtener solo empleados mayores de 30', async () => {
      const response = await request(app)
        .get('/empleados/mayores')
        .expect(200);

      expect(response.body.message).toBe('Empleados mayores a 30 años obtenidos exitosamente');
      expect(response.body.total).toBe(2);
      expect(response.body.data).toHaveLength(2);
      response.body.data.forEach(emp => {
        expect(emp.edad).toBeGreaterThan(30);
      });
    });
  });

  describe('GET /empleados/:id', () => {
    let empleadoId;

    beforeEach(async () => {
      const response = await request(app)
        .post('/empleados')
        .send({
          nombre: 'Test Employee',
          edad: 30,
          puesto: 'Tester',
          departamento: 'QA'
        });
      empleadoId = response.body.data.id;
    });

    it('debería obtener un empleado por ID', async () => {
      const response = await request(app)
        .get(`/empleados/${empleadoId}`)
        .expect(200);

      expect(response.body.message).toBe('Empleado obtenido exitosamente');
      expect(response.body.data.id).toBe(empleadoId);
      expect(response.body.data.nombre).toBe('Test Employee');
    });

    it('debería devolver 404 para ID inexistente', async () => {
      const response = await request(app)
        .get('/empleados/9999')
        .expect(404);

      expect(response.body.message).toBe('Empleado no encontrado');
    });

    it('debería validar ID inválido', async () => {
      const response = await request(app)
        .get('/empleados/abc')
        .expect(400);

      expect(response.body.errors).toBeDefined();
    });
  });

  describe('PUT /empleados/:id', () => {
    let empleadoId;

    beforeEach(async () => {
      const response = await request(app)
        .post('/empleados')
        .send({
          nombre: 'Original Name',
          edad: 30,
          puesto: 'Original',
          departamento: 'Original Dept'
        });
      empleadoId = response.body.data.id;
    });

    it('debería actualizar un empleado existente', async () => {
      const datosActualizados = {
        nombre: 'Updated Name',
        edad: 35,
        puesto: 'Updated Position',
        departamento: 'Updated Dept'
      };

      const response = await request(app)
        .put(`/empleados/${empleadoId}`)
        .send(datosActualizados)
        .expect(200);

      expect(response.body.message).toBe('Empleado actualizado exitosamente');
      expect(response.body.data).toMatchObject(datosActualizados);
    });

    it('debería actualizar parcialmente un empleado', async () => {
      const response = await request(app)
        .put(`/empleados/${empleadoId}`)
        .send({ edad: 40 })
        .expect(200);

      expect(response.body.data.edad).toBe(40);
      expect(response.body.data.nombre).toBe('Original Name');
    });

    it('debería devolver 404 para ID inexistente', async () => {
      const response = await request(app)
        .put('/empleados/9999')
        .send({ nombre: 'Test' })
        .expect(404);

      expect(response.body.message).toBe('Empleado no encontrado');
    });

    it('debería rechazar nombre duplicado al actualizar', async () => {
      // Crear otro empleado
      await request(app)
        .post('/empleados')
        .send({
          nombre: 'Otro Empleado',
          edad: 25,
          puesto: 'Otro',
          departamento: 'Otro'
        });

      // Intentar actualizar con nombre duplicado
      const response = await request(app)
        .put(`/empleados/${empleadoId}`)
        .send({ nombre: 'Otro Empleado' })
        .expect(409);

      expect(response.body.error).toBe('Ya existe un empleado con ese nombre');
    });
  });

  describe('DELETE /empleados/:id', () => {
    let empleadoId;

    beforeEach(async () => {
      const response = await request(app)
        .post('/empleados')
        .send({
          nombre: 'To Delete',
          edad: 30,
          puesto: 'Delete Me',
          departamento: 'Temp'
        });
      empleadoId = response.body.data.id;
    });

    it('debería eliminar un empleado existente', async () => {
      const response = await request(app)
        .delete(`/empleados/${empleadoId}`)
        .expect(200);

      expect(response.body.message).toBe('Empleado eliminado exitosamente');

      // Verificar que fue eliminado
      await request(app)
        .get(`/empleados/${empleadoId}`)
        .expect(404);
    });

    it('debería devolver 404 para ID inexistente', async () => {
      const response = await request(app)
        .delete('/empleados/9999')
        .expect(404);

      expect(response.body.message).toBe('Empleado no encontrado');
    });
  });
});