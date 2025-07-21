# Etapa 1: Build de Angular
FROM node:20-alpine AS build

# Instalar dependencias del sistema necesarias
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copiar archivos de configuración primero (mejor cache)
COPY package*.json ./
COPY angular.json ./
COPY tsconfig*.json ./

# Instalar dependencias
RUN npm ci --only=production=false

# Copiar código fuente
COPY . .

# Build específico para Docker (sin SSR)
RUN npm run build --configuration=docker

# Etapa 2: Servir con NGINX
FROM nginx:alpine

# Copiar configuración personalizada de NGINX para SPA
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Manejo de rutas para SPA (Single Page Application)
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache para archivos estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Configuración de seguridad
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
}
EOF

# Copia el build a la carpeta pública de NGINX
COPY --from=build /app/dist/fronted_web_application/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]