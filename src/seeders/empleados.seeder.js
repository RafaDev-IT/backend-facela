const database = require('../db/database');

const empleadosSeed = [
  {
    nombre: "María García López",
    edad: 28,
    puesto: "Desarrolladora Frontend",
    departamento: "Tecnología"
  },
  {
    nombre: "Juan Carlos Rodríguez",
    edad: 35,
    puesto: "Gerente de Proyectos",
    departamento: "Administración"
  },
  {
    nombre: "Ana Martínez Sánchez",
    edad: 42,
    puesto: "Contadora Senior",
    departamento: "Contabilidad"
  },
  {
    nombre: "Luis Fernando Pérez",
    edad: 26,
    puesto: "Desarrollador Backend",
    departamento: "Tecnología"
  },
  {
    nombre: "Carmen Sofía Jiménez",
    edad: 31,
    puesto: "Analista de RRHH",
    departamento: "Recursos Humanos"
  },
  {
    nombre: "Roberto Alejandro Díaz",
    edad: 45,
    puesto: "Director Financiero",
    departamento: "Finanzas"
  },
  {
    nombre: "Patricia Elena Morales",
    edad: 29,
    puesto: "Diseñadora UX/UI",
    departamento: "Tecnología"
  },
  {
    nombre: "Diego Armando Castro",
    edad: 38,
    puesto: "Jefe de Ventas",
    departamento: "Ventas"
  },
  {
    nombre: "Lucía Fernanda Torres",
    edad: 24,
    puesto: "Asistente Contable",
    departamento: "Contabilidad"
  },
  {
    nombre: "Miguel Ángel Vargas",
    edad: 33,
    puesto: "DevOps Engineer",
    departamento: "Tecnología"
  },
  {
    nombre: "Rosa María Gutiérrez",
    edad: 37,
    puesto: "Gerente de Marketing",
    departamento: "Marketing"
  },
  {
    nombre: "Fernando José Ramírez",
    edad: 41,
    puesto: "Analista de Sistemas",
    departamento: "Tecnología"
  },
  {
    nombre: "Isabel Cristina Flores",
    edad: 27,
    puesto: "Ejecutiva de Ventas",
    departamento: "Ventas"
  },
  {
    nombre: "Andrés Felipe Mendoza",
    edad: 32,
    puesto: "Contador Junior",
    departamento: "Contabilidad"
  },
  {
    nombre: "Claudia Marcela Silva",
    edad: 39,
    puesto: "Directora de RRHH",
    departamento: "Recursos Humanos"
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
        console.log(`⏭️  Empleado "${empleado.nombre}" ya existe, saltando...`);
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