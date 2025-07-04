const database = require('../db/database');
const Empleado = require('../models/Empleado');

const empleadosService = {
  crearEmpleado: (empleadoData) => {
    // Verificar si ya existe un empleado con el mismo nombre
    const empleadoExistente = database.empleados.getByNombre(empleadoData.nombre);
    if (empleadoExistente) {
      throw new Error('Ya existe un empleado con ese nombre');
    }
    
    const nuevoEmpleado = database.empleados.create(empleadoData);
    return new Empleado(
      nuevoEmpleado.id,
      nuevoEmpleado.nombre,
      nuevoEmpleado.edad,
      nuevoEmpleado.puesto,
      nuevoEmpleado.departamento
    );
  },

  obtenerEmpleados: (filtros = {}) => {
    let empleados = database.empleados.getAll();
    
    // Aplicar búsqueda por nombre
    if (filtros.search) {
      empleados = empleados.filter(emp => 
        emp.nombre.toLowerCase().includes(filtros.search.toLowerCase())
      );
    }
    
    // Aplicar filtros
    if (filtros.edadMin) {
      empleados = empleados.filter(emp => emp.edad >= parseInt(filtros.edadMin));
    }
    
    if (filtros.edadMax) {
      empleados = empleados.filter(emp => emp.edad <= parseInt(filtros.edadMax));
    }
    
    if (filtros.puesto) {
      empleados = empleados.filter(emp => 
        emp.puesto.toLowerCase().includes(filtros.puesto.toLowerCase())
      );
    }
    
    if (filtros.departamento) {
      empleados = empleados.filter(emp => 
        emp.departamento.toLowerCase().includes(filtros.departamento.toLowerCase())
      );
    }
    
    // Información de paginación
    const page = parseInt(filtros.page) || 1;
    const limit = parseInt(filtros.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const totalEmpleados = empleados.length;
    const totalPages = Math.ceil(totalEmpleados / limit);
    
    // Aplicar paginación
    const empleadosPaginados = empleados.slice(startIndex, endIndex);
    
    // Convertir a modelo
    const empleadosFormateados = empleadosPaginados.map(emp => new Empleado(
      emp.id,
      emp.nombre,
      emp.edad,
      emp.puesto,
      emp.departamento
    ));
    
    return {
      data: empleadosFormateados,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalEmpleados,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    };
  },

  obtenerEmpleadosMayores: () => {
    const empleados = database.empleados.getAll();
    const empleadosMayores = empleados.filter(emp => emp.edad > 30);
    
    return empleadosMayores.map(emp => new Empleado(
      emp.id,
      emp.nombre,
      emp.edad,
      emp.puesto,
      emp.departamento
    ));
  },

  actualizarEmpleado: (id, datosActualizados) => {
    // Si se está actualizando el nombre, verificar que no exista otro empleado con ese nombre
    if (datosActualizados.nombre) {
      const empleadoExistente = database.empleados.getByNombre(datosActualizados.nombre);
      if (empleadoExistente && empleadoExistente.id !== parseInt(id)) {
        throw new Error('Ya existe un empleado con ese nombre');
      }
    }
    
    const empleadoActualizado = database.empleados.update(id, datosActualizados);
    
    if (!empleadoActualizado) {
      return null;
    }
    
    return new Empleado(
      empleadoActualizado.id,
      empleadoActualizado.nombre,
      empleadoActualizado.edad,
      empleadoActualizado.puesto,
      empleadoActualizado.departamento
    );
  },

  eliminarEmpleado: (id) => {
    return database.empleados.delete(id);
  },

  obtenerEmpleadoPorId: (id) => {
    const empleado = database.empleados.getById(id);
    
    if (!empleado) {
      return null;
    }
    
    return new Empleado(
      empleado.id,
      empleado.nombre,
      empleado.edad,
      empleado.puesto,
      empleado.departamento
    );
  },
  
  // Métodos adicionales para compatibilidad con tests
  obtenerEmpleadoMayores: () => {
    const empleados = database.empleados.getAll();
    const empleadosMayores = empleados.filter(emp => emp.edad > 30);
    
    return empleadosMayores.map(emp => new Empleado(
      emp.id,
      emp.nombre,
      emp.edad,
      emp.puesto,
      emp.departamento
    ));
  },
  
  verificarNombreDuplicado: (nombre, exceptoId = null) => {
    const empleado = database.empleados.getByNombre(nombre);
    if (!empleado) return false;
    if (exceptoId && empleado.id === parseInt(exceptoId)) return false;
    return true;
  },
  
  obtenerEstadisticas: () => {
    const empleados = database.empleados.getAll();
    
    if (empleados.length === 0) {
      return {
        totalEmpleados: 0,
        promedioEdad: 0,
        cantidadPorPuesto: {},
        cantidadPorDepartamento: {}
      };
    }
    
    const totalEmpleados = empleados.length;
    const sumaEdades = empleados.reduce((sum, emp) => sum + emp.edad, 0);
    const promedioEdad = Math.round(sumaEdades / totalEmpleados);
    
    const cantidadPorPuesto = empleados.reduce((acc, emp) => {
      acc[emp.puesto] = (acc[emp.puesto] || 0) + 1;
      return acc;
    }, {});
    
    const cantidadPorDepartamento = empleados.reduce((acc, emp) => {
      acc[emp.departamento] = (acc[emp.departamento] || 0) + 1;
      return acc;
    }, {});
    
    return {
      totalEmpleados,
      promedioEdad,
      cantidadPorPuesto,
      cantidadPorDepartamento
    };
  }
};

module.exports = empleadosService;