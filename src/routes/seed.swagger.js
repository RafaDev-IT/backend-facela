/**
 * @swagger
 * /seed:
 *   post:
 *     summary: 🟢 Poblar base de datos con datos de ejemplo
 *     description: Endpoint adicional para cargar datos de ejemplo en la base de datos. Útil para testing y demos.
 *     tags: [Utilidades]
 *     responses:
 *       201:
 *         description: Seed ejecutado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Seed ejecutado exitosamente
 *                 logs:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: 
 *                     - "Iniciando proceso de seed..."
 *                     - "✅ Empleado creado: Carlos Rodríguez (ID: 1)"
 *                     - "✅ Empleado creado: Ana Martínez (ID: 2)"
 *                 resumen:
 *                   type: object
 *                   properties:
 *                     mensaje:
 *                       type: string
 *                       example: Base de datos poblada con datos de ejemplo
 *                     detalles:
 *                       type: string
 *                       example: "✅ Proceso completado: 15 empleados creados, 0 duplicados omitidos"
 *       500:
 *         description: Error al ejecutar seed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al ejecutar seed
 *                 error:
 *                   type: string
 *                   example: Mensaje de error detallado
 */