let empleados = [];
let nextId = 1;

// Definir métodos del objeto empleados
const empleadosMethods = {
  getAll: () => [...empleados],
  
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
  },
  
  // Método para tests - resetear base de datos
  reset: () => {
    empleados = [];
    nextId = 1;
  }
};

const database = {
  empleados: empleadosMethods,
  
  // Exponer para compatibilidad con tests antiguos
  get nextId() {
    return nextId;
  },
  set nextId(val) {
    nextId = val;
  }
};

// Agregar acceso directo al array para tests
Object.defineProperty(database, 'empleados', {
  get() {
    // Devolver un proxy que actúa como array pero también tiene métodos
    const proxy = new Proxy(empleados, {
      get(target, prop) {
        // Si es un método del objeto empleadosMethods, devolverlo
        if (prop in empleadosMethods) {
          return empleadosMethods[prop];
        }
        // Si es una propiedad del array, devolverla
        return target[prop];
      },
      set(target, prop, value) {
        target[prop] = value;
        return true;
      }
    });
    return proxy;
  },
  set(value) {
    empleados = value;
  }
});

module.exports = database;