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
      const resultado = empleadosService.obtenerEmpleados(req.query);
      res.json({
        message: 'Empleados obtenidos exitosamente',
        ...resultado
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
  },

  actualizarEmpleado: (req, res) => {
    try {
      const { id } = req.params;
      const empleadoActualizado = empleadosService.actualizarEmpleado(id, req.body);
      
      if (!empleadoActualizado) {
        return res.status(404).json({
          message: 'Empleado no encontrado'
        });
      }
      
      res.json({
        message: 'Empleado actualizado exitosamente',
        data: empleadoActualizado
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error al actualizar empleado',
        error: error.message
      });
    }
  },

  eliminarEmpleado: (req, res) => {
    try {
      const { id } = req.params;
      const eliminado = empleadosService.eliminarEmpleado(id);
      
      if (!eliminado) {
        return res.status(404).json({
          message: 'Empleado no encontrado'
        });
      }
      
      res.json({
        message: 'Empleado eliminado exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error al eliminar empleado',
        error: error.message
      });
    }
  }
};

module.exports = empleadosController;