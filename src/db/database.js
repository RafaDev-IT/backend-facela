let empleados = [];
let nextId = 1;

const database = {
  empleados: {
    getAll: () => empleados,
    
    getById: (id) => empleados.find(emp => emp.id === parseInt(id)),
    
    getByNombre: (nombre) => empleados.find(emp => 
      emp.nombre.toLowerCase().trim() === nombre.toLowerCase().trim()
    ),
    
    create: (empleadoData) => {
      const nuevoEmpleado = {
        id: nextId++,
        ...empleadoData
      };
      empleados.push(nuevoEmpleado);
      return nuevoEmpleado;
    },
    
    update: (id, empleadoData) => {
      const index = empleados.findIndex(emp => emp.id === parseInt(id));
      if (index === -1) return null;
      
      empleados[index] = {
        ...empleados[index],
        ...empleadoData
      };
      return empleados[index];
    },
    
    delete: (id) => {
      const index = empleados.findIndex(emp => emp.id === parseInt(id));
      if (index === -1) return false;
      
      empleados.splice(index, 1);
      return true;
    }
  }
};

module.exports = database;