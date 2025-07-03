const database = require('../db/database');

const estadisticasService = {
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

module.exports = estadisticasService;