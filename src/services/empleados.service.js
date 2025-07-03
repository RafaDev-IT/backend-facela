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
  }
};

module.exports = empleadosService;