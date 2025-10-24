# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copiar package.json
COPY package*.json ./

# Instalar todas as dependências
RUN npm ci

# Copiar código e build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copiar build do React
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuração nginx personalizada (AGORA ESTÁ NA MESMA PASTA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]