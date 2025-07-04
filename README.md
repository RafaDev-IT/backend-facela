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

## 📚 API Reference

### 🎯 Base URL

```
http://localhost:3000
```

### 📋 Endpoints Disponibles

#### 🏥 **GET** `/health` - Health Check

Verifica el estado de la API y obtiene información del sistema.

**📤 Response (200):**

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

#### 1️⃣ **POST** `/empleados` - Crear empleado

Crea un nuevo empleado en el sistema.

**📥 Request Body:**

```json
{
  "nombre": "Juan Pérez",
  "edad": 28,
  "puesto": "Desarrollador",
  "departamento": "Tecnología"
}
```

**✅ Validaciones:**

- 📝 `nombre`: string, mínimo 3 caracteres
- 🔢 `edad`: número entero positivo
- 💼 `puesto`: string, requerido
- 🏢 `departamento`: string, requerido

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

#### 2️⃣ **GET** `/empleados` - Listar empleados con paginación

Obtiene la lista de empleados con filtros opcionales y paginación.

**🔍 Query Parameters (todos opcionales):**
| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| `page` | number | Número de página | 1 |
| `limit` | number | Items por página (máx 100) | 10 |
| `search` | string | Buscar por nombre | - |
| `edadMin` | number | Edad mínima | - |
| `edadMax` | number | Edad máxima | - |
| `puesto` | string | Filtrar por puesto (búsqueda parcial) | - |
| `departamento` | string | Filtrar por departamento (búsqueda parcial) | - |

**💡 Ejemplos de uso:**

```
GET /empleados?page=1&limit=5
GET /empleados?edadMin=25&edadMax=35&puesto=Desarrollador&page=2&limit=10
```

**📤 Response (200):**

```json
{
  "message": "Empleados obtenidos exitosamente",
  "data": [
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "edad": 28,
      "puesto": "Desarrollador",
      "departamento": "Tecnología"
    }
  ],
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

#### 3️⃣ **GET** `/empleados/:id` - Obtener empleado por ID

Obtiene la información de un empleado específico.

**🔧 Parámetros:**
- `id`: ID del empleado (número entero)

**📤 Response (200):**

```json
{
  "message": "Empleado obtenido exitosamente",
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

#### 4️⃣ **GET** `/empleados/mayores` - Empleados mayores de 30

Lista todos los empleados con edad superior a 30 años.

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

#### 5️⃣ **PUT** `/empleados/:id` - Actualizar empleado

Actualiza los datos de un empleado existente.

**🔧 Parámetros:**

- `id`: ID del empleado (número entero)

**📥 Request Body (todos los campos opcionales):**

```json
{
  "nombre": "Juan Pérez González",
  "edad": 29,
  "puesto": "Senior Developer",
  "departamento": "Tecnología"
}
```

**✅ Response exitosa (200):**

```json
{
  "message": "Empleado actualizado exitosamente",
  "data": {
    "id": 1,
    "nombre": "Juan Pérez González",
    "edad": 29,
    "puesto": "Senior Developer",
    "departamento": "Tecnología"
  }
}
```

**❌ Empleado no encontrado (404):**

```json
{
  "message": "Empleado no encontrado"
}
```

---

#### 6️⃣ **DELETE** `/empleados/:id` - Eliminar empleado

Elimina un empleado del sistema.

**🔧 Parámetros:**

- `id`: ID del empleado (número entero)

**✅ Response exitosa (200):**

```json
{
  "message": "Empleado eliminado exitosamente"
}
```

**❌ Empleado no encontrado (404):**

```json
{
  "message": "Empleado no encontrado"
}
```

---

#### 7️⃣ **GET** `/estadisticas` - Estadísticas generales

Obtiene un resumen estadístico de todos los empleados.

**📊 Response (200):**

```json
{
  "message": "Estadísticas obtenidas exitosamente",
  "data": {
    "totalEmpleados": 5,
    "promedioEdad": 32,
    "cantidadPorPuesto": {
      "Desarrollador": 2,
      "Gerente": 1,
      "Contador": 2
    },
    "cantidadPorDepartamento": {
      "Tecnología": 2,
      "Ventas": 1,
      "Contabilidad": 2
    }
  }
}
```

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
npm run seed    # 🌱 Poblar base de datos con 15 empleados de ejemplo
npm test        # 🧪 Tests (por implementar)
```

### 🌱 Datos de Ejemplo (Seeder)

Ejecuta el seeder para poblar la base de datos con 15 empleados de ejemplo:

```bash
npm run seed
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
