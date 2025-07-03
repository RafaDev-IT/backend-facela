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
  }
};

module.exports = empleadosController;