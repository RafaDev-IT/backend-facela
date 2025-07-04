const empleadosService = require('../src/services/empleados.service');
const db = require('../src/db/database');

describe('Empleados Service Tests', () => {
  describe('crearEmpleado', () => {
    it('debería crear un empleado con ID autoincrementado', () => {
      const nuevoEmpleado = {
        nombre: 'Test User',
        edad: 30,
        puesto: 'Tester',
        departamento: 'QA'
      };

      const resultado = empleadosService.crearEmpleado(nuevoEmpleado);

      expect(resultado).toMatchObject({
        ...nuevoEmpleado,
        id: 1
      });
      expect(db.empleados).toHaveLength(1);
    });

    it('debería incrementar el ID correctamente', () => {
      empleadosService.crearEmpleado({ nombre: 'User 1', edad: 25, puesto: 'Dev', departamento: 'IT' });
      const segundo = empleadosService.crearEmpleado({ nombre: 'User 2', edad: 25, puesto: 'Dev', departamento: 'IT' });

      expect(segundo.id).toBe(2);
    });
  });

  describe('obtenerEmpleados', () => {
    beforeEach(() => {
      // Agregar empleados de prueba
      for (let i = 1; i <= 15; i++) {
        empleadosService.crearEmpleado({
          nombre: `Empleado ${i}`,
          edad: 20 + i,
          puesto: i % 2 === 0 ? 'Developer' : 'Tester',
          departamento: i % 3 === 0 ? 'QA' : 'IT'
        });
      }
    });

    it('debería obtener todos los empleados con paginación por defecto', () => {
      const resultado = empleadosService.obtenerEmpleados();

      expect(resultado.data).toHaveLength(10);
      expect(resultado.pagination.totalItems).toBe(15);
      expect(resultado.pagination.currentPage).toBe(1);
      expect(resultado.pagination.totalPages).toBe(2);
    });

    it('debería aplicar paginación personalizada', () => {
      const resultado = empleadosService.obtenerEmpleados({ page: 2, limit: 5 });

      expect(resultado.data).toHaveLength(5);
      expect(resultado.pagination.currentPage).toBe(2);
      expect(resultado.pagination.itemsPerPage).toBe(5);
    });

    it('debería filtrar por búsqueda de texto', () => {
      const resultado = empleadosService.obtenerEmpleados({ search: 'Empleado 1' });

      expect(resultado.data.length).toBeGreaterThanOrEqual(1);
      resultado.data.forEach(emp => {
        expect(emp.nombre.toLowerCase()).toContain('empleado 1');
      });
    });

    it('debería filtrar por rango de edad', () => {
      const resultado = empleadosService.obtenerEmpleados({ edadMin: 25, edadMax: 30 });

      resultado.data.forEach(emp => {
        expect(emp.edad).toBeGreaterThanOrEqual(25);
        expect(emp.edad).toBeLessThanOrEqual(30);
      });
    });

    it('debería filtrar por puesto', () => {
      const resultado = empleadosService.obtenerEmpleados({ puesto: 'Developer' });

      resultado.data.forEach(emp => {
        expect(emp.puesto).toBe('Developer');
      });
    });

    it('debería aplicar múltiples filtros simultáneamente', () => {
      const resultado = empleadosService.obtenerEmpleados({
        edadMin: 25,
        edadMax: 35,
        puesto: 'Developer',
        departamento: 'IT'
      });

      resultado.data.forEach(emp => {
        expect(emp.edad).toBeGreaterThanOrEqual(25);
        expect(emp.edad).toBeLessThanOrEqual(35);
        expect(emp.puesto).toBe('Developer');
        expect(emp.departamento).toBe('IT');
      });
    });
  });

  describe('obtenerEmpleadoMayores', () => {
    beforeEach(() => {
      empleadosService.crearEmpleado({ nombre: 'Joven', edad: 25, puesto: 'Junior', departamento: 'IT' });
      empleadosService.crearEmpleado({ nombre: 'Mayor 1', edad: 35, puesto: 'Senior', departamento: 'IT' });
      empleadosService.crearEmpleado({ nombre: 'Mayor 2', edad: 45, puesto: 'Manager', departamento: 'IT' });
    });

    it('debería obtener solo empleados mayores de 30', () => {
      const resultado = empleadosService.obtenerEmpleadoMayores();

      expect(resultado).toHaveLength(2);
      resultado.forEach(emp => {
        expect(emp.edad).toBeGreaterThan(30);
      });
    });
  });

  describe('obtenerEmpleadoPorId', () => {
    let empleadoId;

    beforeEach(() => {
      const emp = empleadosService.crearEmpleado({
        nombre: 'Test',
        edad: 30,
        puesto: 'Tester',
        departamento: 'QA'
      });
      empleadoId = emp.id;
    });

    it('debería obtener un empleado por ID', () => {
      const resultado = empleadosService.obtenerEmpleadoPorId(empleadoId);

      expect(resultado).toBeDefined();
      expect(resultado.id).toBe(empleadoId);
      expect(resultado.nombre).toBe('Test');
    });

    it('debería devolver null para ID inexistente', () => {
      const resultado = empleadosService.obtenerEmpleadoPorId(9999);
      expect(resultado).toBeNull();
    });
  });

  describe('actualizarEmpleado', () => {
    let empleadoId;

    beforeEach(() => {
      const emp = empleadosService.crearEmpleado({
        nombre: 'Original',
        edad: 30,
        puesto: 'Original',
        departamento: 'Original'
      });
      empleadoId = emp.id;
    });

    it('debería actualizar completamente un empleado', () => {
      const datosNuevos = {
        nombre: 'Actualizado',
        edad: 35,
        puesto: 'Nuevo',
        departamento: 'Nuevo'
      };

      const resultado = empleadosService.actualizarEmpleado(empleadoId, datosNuevos);

      expect(resultado).toMatchObject({
        ...datosNuevos,
        id: empleadoId
      });
    });

    it('debería actualizar parcialmente un empleado', () => {
      const resultado = empleadosService.actualizarEmpleado(empleadoId, { edad: 40 });

      expect(resultado.edad).toBe(40);
      expect(resultado.nombre).toBe('Original');
      expect(resultado.puesto).toBe('Original');
    });

    it('debería devolver null para ID inexistente', () => {
      const resultado = empleadosService.actualizarEmpleado(9999, { edad: 40 });
      expect(resultado).toBeNull();
    });
  });

  describe('eliminarEmpleado', () => {
    let empleadoId;

    beforeEach(() => {
      const emp = empleadosService.crearEmpleado({
        nombre: 'To Delete',
        edad: 30,
        puesto: 'Temp',
        departamento: 'Temp'
      });
      empleadoId = emp.id;
    });

    it('debería eliminar un empleado existente', () => {
      const totalAntes = db.empleados.length;
      const resultado = empleadosService.eliminarEmpleado(empleadoId);

      expect(resultado).toBe(true);
      expect(db.empleados.length).toBe(totalAntes - 1);
      expect(empleadosService.obtenerEmpleadoPorId(empleadoId)).toBeNull();
    });

    it('debería devolver false para ID inexistente', () => {
      const resultado = empleadosService.eliminarEmpleado(9999);
      expect(resultado).toBe(false);
    });
  });

  describe('verificarNombreDuplicado', () => {
    beforeEach(() => {
      empleadosService.crearEmpleado({
        nombre: 'Juan Pérez',
        edad: 30,
        puesto: 'Dev',
        departamento: 'IT'
      });
    });

    it('debería detectar nombre duplicado', () => {
      const resultado = empleadosService.verificarNombreDuplicado('Juan Pérez');
      expect(resultado).toBe(true);
    });

    it('debería detectar nombre duplicado sin importar mayúsculas', () => {
      const resultado = empleadosService.verificarNombreDuplicado('JUAN PÉREZ');
      expect(resultado).toBe(true);
    });

    it('debería devolver false para nombre no duplicado', () => {
      const resultado = empleadosService.verificarNombreDuplicado('María García');
      expect(resultado).toBe(false);
    });

    it('debería excluir empleado por ID al verificar', () => {
      const emp = db.empleados[0];
      const resultado = empleadosService.verificarNombreDuplicado('Juan Pérez', emp.id);
      expect(resultado).toBe(false);
    });
  });

  describe('obtenerEstadisticas', () => {
    it('debería devolver estadísticas vacías sin empleados', () => {
      const resultado = empleadosService.obtenerEstadisticas();

      expect(resultado).toEqual({
        totalEmpleados: 0,
        promedioEdad: 0,
        cantidadPorPuesto: {},
        cantidadPorDepartamento: {}
      });
    });

    it('debería calcular estadísticas correctamente', () => {
      empleadosService.crearEmpleado({ nombre: 'E1', edad: 20, puesto: 'Dev', departamento: 'IT' });
      empleadosService.crearEmpleado({ nombre: 'E2', edad: 30, puesto: 'Dev', departamento: 'IT' });
      empleadosService.crearEmpleado({ nombre: 'E3', edad: 40, puesto: 'QA', departamento: 'Testing' });

      const resultado = empleadosService.obtenerEstadisticas();

      expect(resultado).toEqual({
        totalEmpleados: 3,
        promedioEdad: 30,
        cantidadPorPuesto: {
          'Dev': 2,
          'QA': 1
        },
        cantidadPorDepartamento: {
          'IT': 2,
          'Testing': 1
        }
      });
    });
  });
});