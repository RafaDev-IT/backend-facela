/**
 * @swagger
 * /empleados:
 *   post:
 *     summary: 🔵 Crear un nuevo empleado
 *     description: Endpoint requerido en la prueba técnica. Crea un empleado con validaciones de edad positiva y nombre mínimo 3 caracteres.
 *     tags: [Empleados - Requeridos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmpleadoInput'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/EmpleadoCreated'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /empleados:
 *   get:
 *     summary: 🔵 Listar empleados con filtros
 *     description: |
 *       Endpoint requerido en la prueba técnica con filtros por edadMin, edadMax y puesto.
 *       
 *       **Ejemplos de uso:**
 *       - Sin filtros: `/empleados` - Lista todos los empleados
 *       - Con filtros: `/empleados?edadMin=30&puesto=Contadora&departamento=Contabilidad`
 *       - Con paginación: `/empleados?page=1&limit=5`
 *       - Búsqueda por nombre: `/empleados?search=Juan`
 *       
 *       **Mejoras adicionales implementadas:**
 *       - 🟢 Paginación con metadatos completos
 *       - 🟢 Búsqueda por nombre
 *       - 🟢 Filtro por departamento
 *     tags: [Empleados - Requeridos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: 🟢 Número de página (adicional)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: 🟢 Items por página (adicional)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: 🟢 Buscar por nombre (adicional)
 *       - in: query
 *         name: edadMin
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: 🔵 Edad mínima (requerido en prueba)
 *       - in: query
 *         name: edadMax
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: 🔵 Edad máxima (requerido en prueba)
 *       - in: query
 *         name: puesto
 *         schema:
 *           type: string
 *         description: 🔵 Filtrar por puesto (requerido en prueba)
 *       - in: query
 *         name: departamento
 *         schema:
 *           type: string
 *         description: 🟢 Filtrar por departamento (adicional)
 *     responses:
 *       200:
 *         $ref: '#/components/responses/EmpleadosList'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /empleados/mayores:
 *   get:
 *     summary: 🔵 Obtener empleados mayores de 30
 *     description: Endpoint requerido en la prueba técnica. Lista empleados cuya edad es mayor a 30 años.
 *     tags: [Empleados - Requeridos]
 *     responses:
 *       200:
 *         description: Lista de empleados mayores de 30
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Empleados mayores a 30 años obtenidos exitosamente
 *                 total:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Empleado'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /empleados/{id}:
 *   get:
 *     summary: 🟢 Obtener empleado por ID
 *     description: Endpoint adicional implementado por iniciativa propia para obtener un empleado específico.
 *     tags: [Empleados - Adicionales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Empleado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Empleado obtenido exitosamente
 *                 data:
 *                   $ref: '#/components/schemas/Empleado'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /empleados/{id}:
 *   put:
 *     summary: 🔵 Actualizar empleado
 *     description: Endpoint requerido en la prueba técnica. Actualiza un empleado existente con validación de existencia.
 *     tags: [Empleados - Requeridos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del empleado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmpleadoUpdate'
 *     responses:
 *       200:
 *         description: Empleado actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Empleado actualizado exitosamente
 *                 data:
 *                   $ref: '#/components/schemas/Empleado'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /empleados/{id}:
 *   delete:
 *     summary: 🔵 Eliminar empleado
 *     description: Endpoint requerido en la prueba técnica. Elimina un empleado por su ID.
 *     tags: [Empleados - Requeridos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Empleado eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Empleado eliminado exitosamente
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */