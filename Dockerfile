# Dockerfile simple para la aplicación
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Crear directorio de logs
RUN mkdir -p logs

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["node", "src/index.js"]