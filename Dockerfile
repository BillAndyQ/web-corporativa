# --- Etapa 1: dependencias y build ---
FROM node:22-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Solo los manifiestos primero, para reutilizar la caché de npm ci
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .

# Las variables NEXT_PUBLIC_* quedan fijadas en el JS en este paso:
# hay que pasarlas con --build-arg (con -e al ejecutar no tienen efecto).
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN test -n "$NEXT_PUBLIC_API_URL" || (echo "Falta --build-arg NEXT_PUBLIC_API_URL" && exit 1)
RUN npm run build

# --- Etapa 2: imagen final mínima ---
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000

COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public

USER node
EXPOSE 3000
CMD ["node", "server.js"]
