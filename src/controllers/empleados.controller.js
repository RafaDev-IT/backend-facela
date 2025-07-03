const empleadosService = require('../services/empleados.service');

const empleadosController = {
  crearEmpleado: (req, res) => {
    try {
      const nuevoEmpleado = empleadosService.crearEmpleado(req.body);
      res.status(201).json({
        message: 'Empleado creado exitosamente',
        data: nuevoEmpleado
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error al crear empleado',
        error: error.message
      });
    }
  },

  obtenerEmpleados: (req, res) => {
    try {
      const empleados = empleadosService.obtenerEmpleados(req.query);
      res.json({
        message: 'Empleados obtenidos exitosamente',
        total: empleados.length,
        data: empleados
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error al obtener empleados',
        error: error.message
      });
    }
  },

  obtenerEmpleadosMayores: (req, res) => {
    try {
      const empleadosMayores = empleadosService.obtenerEmpleadosMayores();
      res.json({
        message: 'Empleados mayores a 30 años obtenidos exitosamente',
        total: empleadosMayores.length,
        data: empleadosMayores
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error al obtener empleados mayores',
        error: error.message
      });
    }
  }
};

module.exports = empleadosController;