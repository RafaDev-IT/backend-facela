const database = require('../db/database');
const Empleado = require('../models/Empleado');

const empleadosService = {
  crearEmpleado: (empleadoData) => {
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
  }
};

module.exports = empleadosService;