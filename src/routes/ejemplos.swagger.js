/**
 * @swagger
 * /empleados:
 *   get:
 *     summary: 📋 Ejemplos de uso - Listar empleados
 *     description: |
 *       ### Casos de uso del endpoint GET /empleados
 *       
 *       Este endpoint es muy versátil y puede usarse de múltiples formas:
 *       
 *       #### 1️⃣ Listar todos los empleados (sin filtros)
 *       ```
 *       GET /empleados
 *       ```
 *       Devuelve todos los empleados con paginación por defecto (10 items por página)
 *       
 *       #### 2️⃣ Listar con paginación personalizada
 *       ```
 *       GET /empleados?page=1&limit=5
 *       ```
 *       Página 1 con 5 empleados por página
 *       
 *       #### 3️⃣ Filtrar por rango de edad (requerido en prueba)
 *       ```
 *       GET /empleados?edadMin=25&edadMax=35
 *       ```
 *       Solo empleados entre 25 y 35 años
 *       
 *       #### 4️⃣ Filtrar por puesto (requerido en prueba)
 *       ```
 *       GET /empleados?puesto=Desarrollador
 *       ```
 *       Solo empleados con puesto "Desarrollador"
 *       
 *       #### 5️⃣ Filtros combinados con paginación
 *       ```
 *       GET /empleados?edadMin=25&edadMax=35&puesto=Desarrollador&departamento=Tecnología&page=1&limit=10
 *       ```
 *       
 *       #### 6️⃣ Búsqueda por nombre (adicional)
 *       ```
 *       GET /empleados?search=Juan
 *       ```
 *       Busca empleados cuyo nombre contenga "Juan"
 *       
 *       #### 7️⃣ Ejemplo solicitado en la prueba técnica
 *       ```
 *       GET /empleados?edadMin=30&puesto=Contadora&departamento=Contabilidad
 *       ```
 *     tags: [Empleados - Requeridos]
 *     x-code-samples:
 *       - lang: 'curl'
 *         label: 'Todos los empleados'
 *         source: |
 *           curl -X GET http://localhost:3000/empleados
 *       - lang: 'curl'
 *         label: 'Con filtros'
 *         source: |
 *           curl -X GET "http://localhost:3000/empleados?edadMin=25&edadMax=35&puesto=Desarrollador"
 *       - lang: 'curl'
 *         label: 'Con paginación'
 *         source: |
 *           curl -X GET "http://localhost:3000/empleados?page=1&limit=5"
 *       - lang: 'JavaScript'
 *         label: 'Fetch API'
 *         source: |
 *           fetch('http://localhost:3000/empleados?edadMin=25&edadMax=35')
 *             .then(response => response.json())
 *             .then(data => console.log(data));
 */

/**
 * @swagger
 * /empleados/{id}:
 *   get:
 *     summary: 🔍 Buscar empleado específico vs Buscar muchos empleados
 *     description: |
 *       ### Diferencias entre búsquedas
 *       
 *       **Para buscar UN empleado específico por ID:**
 *       ```
 *       GET /empleados/1
 *       GET /empleados/123
 *       ```
 *       
 *       **Para buscar VARIOS empleados con filtros:**
 *       ```
 *       GET /empleados?search=Juan
 *       GET /empleados?departamento=Ventas
 *       GET /empleados?edadMin=30
 *       ```
 *     tags: [Empleados - Adicionales]
 */