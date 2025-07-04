// Configuración global para los tests
beforeEach(() => {
  // Limpiar mocks antes de cada test
  jest.clearAllMocks();
  
  // Resetear la base de datos antes de cada test
  const db = require('../src/db/database');
  if (db.empleados.reset) {
    db.empleados.reset();
  } else {
    // Fallback para compatibilidad
    db.empleados = [];
    db.nextId = 1;
  }
});

// Silenciar console.log durante los tests
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};