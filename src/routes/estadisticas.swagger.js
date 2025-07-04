/**
 * @swagger
 * /estadisticas:
 *   get:
 *     summary: 🔵 Obtener estadísticas de empleados
 *     description: |
 *       Endpoint requerido en la prueba técnica. Devuelve un resumen con:
 *       - Total de empleados
 *       - Promedio de edad
 *       - Cantidad por puesto
 *       - Cantidad por departamento
 *     tags: [Estadísticas]
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Estadísticas obtenidas exitosamente
 *                 data:
 *                   $ref: '#/components/schemas/Estadisticas'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */