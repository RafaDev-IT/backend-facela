const database = require('../db/database');

const empleadosSeed = [
  {
    id: 1,
    nombre: "Ana Pérez",
    edad: 35,
    puesto: "Contadora",
    departamento: "Contabilidad"
  },
  {
    id: 2,
    nombre: "Carlos López",
    edad: 28,
    puesto: "Analista de Costos",
    departamento: "Contabilidad"
  },
  {
    id: 3,
    nombre: "Luis García",
    edad: 42,
    puesto: "Gerente Administrativo",
    departamento: "Administración"
  },
  {
    id: 4,
    nombre: "María Torres",
    edad: 31,
    puesto: "Asistente Administrativa",
    departamento: "Administración"
  },
  {
    id: 5,
    nombre: "Javier Méndez",
    edad: 24,
    puesto: "Desarrollador",
    departamento: "Informatica"
  },
  {
    id: 6,
    nombre: "Sofía Romero",
    edad: 29,
    puesto: "Diseñadora Gráfica",
    departamento: "Marketing"
  },
  {
    id: 7,
    nombre: "Roberto Díaz",
    edad: 38,
    puesto: "Jefe de Operaciones",
    departamento: "Operaciones"
  },
  {
    id: 8,
    nombre: "Elena Gutiérrez",
    edad: 26,
    puesto: "Asistente de Recursos Humanos",
    departamento: "RRHH"
  },
  {
    id: 9,
    nombre: "Pedro Martínez",
    edad: 45,
    puesto: "Jefe de Proyecto",
    departamento: "Informatica"
  },
  {
    id: 10,
    nombre: "Laura Jiménez",
    edad: 32,
    puesto: "Analista QA",
    departamento: "Informatica"
  },
  {
    id: 11,
    nombre: "Miguel Salazar",
    edad: 40,
    puesto: "Arquitecto de Software",
    departamento: "Informatica"
  },
  {
    id: 12,
    nombre: "Isabel Ruiz",
    edad: 27,
    puesto: "Ejecutiva de Ventas",
    departamento: "Ventas"
  },
  {
    id: 13,
    nombre: "Daniela Vega",
    edad: 30,
    puesto: "Diseñadora UX",
    departamento: "Marketing"
  },
  {
    id: 14,
    nombre: "Oscar Herrera",
    edad: 33,
    puesto: "Soporte Técnico",
    departamento: "Informatica"
  },
  {
    id: 15,
    nombre: "Patricia Castro",
    edad: 36,
    puesto: "Analista de Nómina",
    departamento: "RRHH"
  }
];

const seedEmpleados = () => {
  console.log('🌱 Iniciando seeder de empleados...');
  
  let created = 0;
  let skipped = 0;
  
  empleadosSeed.forEach(empleado => {
    try {
      // Verificar si ya existe
      const existe = database.empleados.getByNombre(empleado.nombre);
      if (existe) {
        console.log(`⏭️  Empleado "${empleado.nombre}" duplicado omitido`);
        skipped++;
      } else {
        database.empleados.create(empleado);
        console.log(`✅ Empleado "${empleado.nombre}" creado exitosamente`);
        created++;
      }
    } catch (error) {
      console.error(`❌ Error al crear empleado "${empleado.nombre}":`, error.message);
    }
  });
  
  console.log('\n📊 Resumen del seeder:');
  console.log(`   - Empleados creados: ${created}`);
  console.log(`   - Empleados omitidos: ${skipped}`);
  console.log(`   - Total en base de datos: ${database.empleados.getAll().length}`);
  console.log('✨ Seeder completado!\n');
};

module.exports = seedEmpleados;