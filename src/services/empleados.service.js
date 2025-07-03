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
    
    return empleados.map(emp => new Empleado(
      emp.id,
      emp.nombre,
      emp.edad,
      emp.puesto,
      emp.departamento
    ));
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