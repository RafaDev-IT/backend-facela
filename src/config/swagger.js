const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '👥 API REST Empleados',
      version: '1.0.0',
      description: `
        API REST moderna para gestión de empleados desarrollada con Node.js y Express.
        
        ## 🚀 Características
        - CRUD completo de empleados
        - Paginación y filtros avanzados
        - Validaciones robustas
        - Estadísticas en tiempo real
        - Logging empresarial
        
        ## 🎯 Endpoints Requeridos vs Adicionales
        Los endpoints marcados con 🔵 fueron requeridos en la prueba técnica.
        Los marcados con 🟢 son mejoras implementadas por iniciativa propia.
      `,
      contact: {
        name: 'Rafael Martinez',
        url: 'https://github.com/RafaDev-IT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
    ],
    tags: [
      {
        name: 'Health',
        description: '🏥 Endpoint de salud del servicio'
      },
      {
        name: 'Empleados - Requeridos',
        description: '🔵 Endpoints solicitados en la prueba técnica'
      },
      {
        name: 'Empleados - Adicionales',
        description: '🟢 Endpoints agregados por iniciativa propia'
      },
      {
        name: 'Estadísticas',
        description: '📊 Endpoint de estadísticas'
      },
      {
        name: 'Utilidades',
        description: '🛠️ Utilidades y herramientas'
      }
    ],
    components: {
      schemas: {
        Empleado: {
          type: 'object',
          required: ['nombre', 'edad', 'puesto', 'departamento'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único del empleado',
              example: 1
            },
            nombre: {
              type: 'string',
              description: 'Nombre completo del empleado',
              minLength: 3,
              example: 'Juan Pérez'
            },
            edad: {
              type: 'integer',
              description: 'Edad del empleado',
              minimum: 1,
              example: 28
            },
            puesto: {
              type: 'string',
              description: 'Puesto de trabajo',
              example: 'Desarrollador'
            },
            departamento: {
              type: 'string',
              description: 'Departamento al que pertenece',
              example: 'Tecnología'
            }
          }
        },
        EmpleadoInput: {
          type: 'object',
          required: ['nombre', 'edad', 'puesto', 'departamento'],
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre completo del empleado',
              minLength: 3,
              example: 'Juan Pérez'
            },
            edad: {
              type: 'integer',
              description: 'Edad del empleado',
              minimum: 1,
              example: 28
            },
            puesto: {
              type: 'string',
              description: 'Puesto de trabajo',
              example: 'Desarrollador'
            },
            departamento: {
              type: 'string',
              description: 'Departamento al que pertenece',
              example: 'Tecnología'
            }
          }
        },
        EmpleadoUpdate: {
          type: 'object',
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre completo del empleado',
              minLength: 3,
              example: 'Juan Pérez González'
            },
            edad: {
              type: 'integer',
              description: 'Edad del empleado',
              minimum: 1,
              example: 29
            },
            puesto: {
              type: 'string',
              description: 'Puesto de trabajo',
              example: 'Senior Developer'
            },
            departamento: {
              type: 'string',
              description: 'Departamento al que pertenece',
              example: 'Tecnología'
            }
          }
        },
        PaginationMeta: {
          type: 'object',
          properties: {
            currentPage: {
              type: 'integer',
              example: 1
            },
            totalPages: {
              type: 'integer',
              example: 3
            },
            totalItems: {
              type: 'integer',
              example: 15
            },
            itemsPerPage: {
              type: 'integer',
              example: 5
            },
            hasNextPage: {
              type: 'boolean',
              example: true
            },
            hasPreviousPage: {
              type: 'boolean',
              example: false
            }
          }
        },
        Estadisticas: {
          type: 'object',
          properties: {
            totalEmpleados: {
              type: 'integer',
              example: 15
            },
            promedioEdad: {
              type: 'integer',
              example: 32
            },
            cantidadPorPuesto: {
              type: 'object',
              additionalProperties: {
                type: 'integer'
              },
              example: {
                'Desarrollador': 5,
                'Gerente': 2,
                'Contador': 3
              }
            },
            cantidadPorDepartamento: {
              type: 'object',
              additionalProperties: {
                type: 'integer'
              },
              example: {
                'Tecnología': 8,
                'Ventas': 3,
                'Contabilidad': 4
              }
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Error al procesar la solicitud'
            },
            error: {
              type: 'string',
              example: 'Descripción detallada del error'
            }
          }
        },
        ValidationError: {
          type: 'object',
          properties: {
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    example: 'field'
                  },
                  msg: {
                    type: 'string',
                    example: 'El nombre debe tener al menos 3 caracteres'
                  },
                  path: {
                    type: 'string',
                    example: 'nombre'
                  },
                  location: {
                    type: 'string',
                    example: 'body'
                  }
                }
              }
            }
          }
        }
      },
      responses: {
        EmpleadoCreated: {
          description: 'Empleado creado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Empleado creado exitosamente'
                  },
                  data: {
                    $ref: '#/components/schemas/Empleado'
                  }
                }
              }
            }
          }
        },
        EmpleadosList: {
          description: 'Lista de empleados con paginación',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Empleados obtenidos exitosamente'
                  },
                  data: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Empleado'
                    }
                  },
                  pagination: {
                    $ref: '#/components/schemas/PaginationMeta'
                  }
                }
              }
            }
          }
        },
        NotFound: {
          description: 'Recurso no encontrado',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Empleado no encontrado'
                  }
                }
              }
            }
          }
        },
        Conflict: {
          description: 'Conflicto - Recurso duplicado',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Conflicto'
                  },
                  error: {
                    type: 'string',
                    example: 'Ya existe un empleado con ese nombre'
                  }
                }
              }
            }
          }
        },
        ValidationError: {
          description: 'Error de validación',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ValidationError'
              }
            }
          }
        },
        ServerError: {
          description: 'Error del servidor',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.swagger.js', './src/index.js'], // Archivos donde están las rutas documentadas
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi
};