# 👥 API REST Empleados - Backend Node.js

¡Bienvenido! Este es un **API REST moderna y eficiente** para la gestión de empleados, desarrollada con **Node.js y Express** siguiendo las mejores prácticas de la industria.

## 🚀 Características Principales

- ✨ **CRUD Completo** de empleados con validaciones robustas
- 📄 **Paginación eficiente** con metadatos completos
- 🔍 **Filtros avanzados** por edad, puesto y departamento
- 📊 **Estadísticas en tiempo real** de la plantilla
- 🛡️ **Validaciones profesionales** con express-validator
- 📝 **Logging detallado** para debugging y monitoreo
- ⚡ **Arquitectura limpia** con separación de responsabilidades
- 🔄 **API RESTful** siguiendo estándares HTTP
- 🌐 **CORS habilitado** para integración con frontends
- 🏥 **Health Check** endpoint para monitoreo
- 📖 **Documentación Swagger/OpenAPI** interactiva

## 🛠️ Stack Tecnológico

- 🟢 **Node.js** - Entorno de ejecución JavaScript
- ⚡ **Express.js** - Framework web minimalista y flexible
- 🛡️ **express-validator** - Validación de datos profesional
- 📝 **Morgan** - Logger HTTP para desarrollo
- 🌐 **CORS** - Manejo de solicitudes cross-origin
- 🔄 **Nodemon** - Hot-reload en desarrollo
- 🎯 **JavaScript ES6+** - Sintaxis moderna

## 📁 Estructura del Proyecto

```
backend-facela/
├── 📂 src/
│   ├── 🎮 controllers/      # Controladores (lógica de endpoints)
│   ├── 💾 db/              # Base de datos en memoria
│   ├── 🔧 middleware/      # Middlewares personalizados
│   ├── 📋 models/          # Modelos de datos
│   ├── 🛣️ routes/          # Definición de rutas
│   ├── 💼 services/        # Lógica de negocio
│   ├── 🔨 utils/           # Utilidades y validadores
│   └── 🚀 index.js         # Punto de entrada
├── 🔐 .env                # Variables de entorno (ignorado en git)
├── 📄 .env.example         # Variables de entorno ejemplo
├── 🚫 .gitignore
├── 📦 package.json
├── 📮 postman_collection.json  # Colección de Postman
└── 📖 README.md
```

## ⚡ Inicio Rápido

### 📋 Requisitos Previos

- Node.js (v14 o superior) ✅
- npm o yarn 📦

### 🔧 Instalación

```bash
# 1️⃣ Clonar el repositorio
git clone https://github.com/RafaDev-IT/backend-facela.git

# 2️⃣ Entrar al directorio
cd backend-facela

# 3️⃣ Instalar dependencias
npm install

# 4️⃣ Configurar variables de entorno (opcional)
cp .env.example .env
```

### 🚀 Ejecutar la Aplicación

```bash
# 🔥 Modo desarrollo (con hot-reload)
npm run dev

# 🌟 Modo producción
npm start
```

✨ **¡Listo!** La API estará disponible en `http://localhost:3000`

### 📖 Documentación Interactiva (Swagger)

Una vez iniciada la aplicación, puedes acceder a la documentación interactiva en:

```
http://localhost:3000/api-docs
```

La documentación Swagger incluye:
- 🎯 Distinción clara entre endpoints requeridos (🔵) y adicionales (🟢)
- 🧪 Posibilidad de probar todos los endpoints directamente
- 📋 Esquemas de datos y respuestas detalladas
- 🔍 Ejemplos de uso para cada endpoint

## 📚 API Reference

### 🎯 Base URL
```
http://localhost:3000
```

---

## 🎯 Endpoints Requeridos en la Prueba Técnica

Los siguientes endpoints fueron solicitados específicamente en la evaluación:

### 1️⃣ **POST** `/empleados` - Crear empleado
**✅ Requerido en la prueba**

Crea un nuevo empleado con validaciones de edad positiva y nombre mínimo 3 caracteres.

**📥 Request Body:**
```json
{
  "nombre": "Juan Pérez",
  "edad": 28,
  "puesto": "Desarrollador",
  "departamento": "Tecnología"
}
```

**📤 Response exitosa (201):**
```json
{
  "message": "Empleado creado exitosamente",
  "data": {
    "id": 1,
    "nombre": "Juan Pérez",
    "edad": 28,
    "puesto": "Desarrollador",
    "departamento": "Tecnología"
  }
}
```

---

### 2️⃣ **GET** `/empleados` - Listar empleados
**✅ Requerido en la prueba** - Con filtros por edadMin, edadMax y puesto

Lista empleados con los filtros solicitados en la prueba.

**🔍 Query Parameters requeridos:**
- `edadMin` - Edad mínima
- `edadMax` - Edad máxima  
- `puesto` - Filtrar por puesto

**Ejemplo solicitado en la prueba:**
```
GET /empleados?edadMin=30&puesto=Contadora&departamento=Contabilidad
```

---

### 3️⃣ **GET** `/empleados/mayores` - Empleados mayores de 30
**✅ Requerido en la prueba**

Lista empleados cuya edad es mayor a 30 años.

**📤 Response (200):**
```json
{
  "message": "Empleados mayores a 30 años obtenidos exitosamente",
  "total": 1,
  "data": [
    {
      "id": 2,
      "nombre": "María García",
      "edad": 35,
      "puesto": "Gerente",
      "departamento": "Ventas"
    }
  ]
}
```

---

### 4️⃣ **PUT** `/empleados/:id` - Actualizar empleado
**✅ Requerido en la prueba**

Actualiza un empleado existente con validación de existencia.

**🔧 Parámetros:**
- `id`: ID del empleado

**📥 Request Body:**
```json
{
  "nombre": "Juan Pérez González",
  "edad": 29,
  "puesto": "Senior Developer"
}
```

---

### 5️⃣ **DELETE** `/empleados/:id` - Eliminar empleado
**✅ Requerido en la prueba**

Elimina un empleado por su ID.

**🔧 Parámetros:**
- `id`: ID del empleado

---

### 6️⃣ **GET** `/estadisticas` - Estadísticas
**✅ Requerido en la prueba**

Devuelve el resumen solicitado:
- Total de empleados
- Promedio de edad
- Cantidad por puesto
- Cantidad por departamento

**📊 Response (200):**
```json
{
  "message": "Estadísticas obtenidas exitosamente",
  "data": {
    "totalEmpleados": 5,
    "promedioEdad": 32,
    "cantidadPorPuesto": {
      "Desarrollador": 2,
      "Gerente": 1
    },
    "cantidadPorDepartamento": {
      "Tecnología": 2,
      "Ventas": 1
    }
  }
}
```

---

## 🚀 Endpoints Adicionales (Iniciativa Propia)

Como desarrollador autodidacta, implementé los siguientes endpoints adicionales para mejorar la funcionalidad:

### 🔍 **Búsqueda por nombre en GET /empleados**
**➕ Adicional**

Agregué el parámetro `search` para buscar empleados por nombre.

```
GET /empleados?search=Juan
```

---

### 📄 **Paginación en GET /empleados**
**➕ Adicional**

Implementé paginación profesional con metadatos completos:
- `page` - Número de página (default: 1)
- `limit` - Items por página (default: 10, max: 100)

Response incluye:
```json
{
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 15,
    "itemsPerPage": 5,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

---

### 🆔 **GET** `/empleados/:id` - Obtener empleado por ID
**➕ Adicional**

Endpoint para obtener un empleado específico.

```
GET /empleados/1
```

---

### 🌱 **POST** `/seed` - Poblar datos de ejemplo
**➕ Adicional**

Endpoint para cargar datos de ejemplo en la base de datos.

```
POST /seed
```

**📤 Response:**
```json
{
  "message": "Seed ejecutado exitosamente",
  "logs": [
    "Iniciando proceso de seed...",
    "✅ Empleado creado: Carlos Rodríguez (ID: 1)",
    "✅ Empleado creado: Ana Martínez (ID: 2)"
  ],
  "resumen": {
    "mensaje": "Base de datos poblada con datos de ejemplo",
    "detalles": "✅ Proceso completado: 15 empleados creados, 0 duplicados omitidos"
  }
}
```

---

### 🏥 **GET** `/health` - Health Check
**➕ Adicional**

Endpoint para monitoreo y estado del servicio.

**📤 Response:**
```json
{
  "status": "OK",
  "message": "API funcionando correctamente",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "environment": "development",
  "version": "1.0.0"
}
```

---

## 🛡️ Mejoras Implementadas por Iniciativa Propia

### 1. **Validación de Nombres Duplicados**
Agregué validación para evitar empleados con nombres idénticos, devolviendo error 409 (Conflict).

### 2. **Logging Avanzado con Winston**
Implementé logs con rotación diaria y archivos separados para errores.

### 3. **Seeder de Datos**
Creé un endpoint POST /seed con 15 empleados realistas para facilitar las pruebas.

### 4. **Colección de Postman**
Incluí una colección completa para importar y probar todos los endpoints.

### 5. **Endpoint de Seed**
Convertí el script de seed en un endpoint POST /seed para mayor flexibilidad.

### 6. **Estructura MVC Profesional**
Organicé el código siguiendo el patrón MVC con servicios separados.

### 7. **Manejo de Errores Consistente**
Implementé respuestas HTTP apropiadas (400, 404, 409, 500) con mensajes descriptivos.

### 8. **Documentación Swagger/OpenAPI**
Documentación interactiva completa con distinción entre endpoints requeridos y adicionales.

## ⚠️ Manejo de Errores

La API maneja errores de forma consistente y amigable:

### 🚫 Error de Validación (400)

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "El nombre debe tener al menos 3 caracteres",
      "path": "nombre",
      "location": "body"
    }
  ]
}
```

### ⚠️ Error de Conflicto (409)

```json
{
  "message": "Conflicto",
  "error": "Ya existe un empleado con ese nombre"
}
```

### 💥 Error del Servidor (500)

```json
{
  "message": "Error al procesar la solicitud",
  "error": "Mensaje de error detallado"
}
```

## 🎨 Características Técnicas

| Característica        | Descripción                             |
| --------------------- | --------------------------------------- |
| 🛡️ **Validaciones**   | Express-validator para inputs seguros   |
| 🌐 **CORS**           | Habilitado para cualquier origen        |
| 📝 **Logging**        | Winston con rotación diaria + Morgan    |
| 💾 **Almacenamiento** | In-memory (se reinicia con el servidor) |
| 🔄 **Hot Reload**     | Nodemon en desarrollo                   |
| 🏗️ **Arquitectura**   | MVC con servicios separados             |
| 🚫 **Duplicados**     | Validación de nombres únicos            |
| 📁 **Logs**           | Archivos con rotación de 14 días        |

### 📦 Colección de Postman Incluida

¡Hemos incluido una colección completa de Postman! Simplemente:

1. 📥 Importa el archivo `postman_collection.json` en Postman
2. 🔧 La variable `{{base_url}}` ya está configurada como `http://localhost:3000`
3. 🚀 ¡Empieza a probar todos los endpoints!

### 📮 Ejemplos de Pruebas Rápidas

#### 🟢 Crear empleado

```http
POST http://localhost:3000/empleados
Content-Type: application/json

{
  "nombre": "Ana López",
  "edad": 27,
  "puesto": "Contadora",
  "departamento": "Contabilidad"
}
```

#### 🔵 Buscar empleados jóvenes contadores

```http
GET http://localhost:3000/empleados?edadMax=30&puesto=Conta
```

#### 🟣 Ver estadísticas

```http
GET http://localhost:3000/estadisticas
```

## 💡 Tips Pro

- 🚀 Usa `npm run dev` para desarrollo con auto-reload
- 🔍 Los filtros en GET /empleados son case-insensitive
- 📊 El endpoint de estadísticas es perfecto para dashboards
- 🛡️ Todas las validaciones devuelven mensajes descriptivos

## 📜 Scripts Disponibles

```bash
npm run dev     # 🔥 Desarrollo con hot-reload
npm start       # 🚀 Producción
npm test        # 🧪 Tests (por implementar)
```

### 🌱 Datos de Ejemplo (Seeder)

Utiliza el endpoint POST /seed para poblar la base de datos con 15 empleados de ejemplo:

```bash
curl -X POST http://localhost:3000/seed
```

El seeder:
- ✅ Crea 15 empleados con datos realistas
- 🚫 Evita duplicados si ya existen
- 📊 Muestra resumen de la operación
- 🎯 Perfecto para testing y demos

---

<div align="center">

### 💻 Desarrollado con ❤️ por Rafael Martinez

⭐ **¿Te gustó el proyecto?** ¡Dale una estrella!

🔗 **Conectemos:** [GitHub](https://github.com/RafaDev-IT)

</div>