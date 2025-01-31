# Stage 1: Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --production

RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

# Stage 2: Final stage (smaller runtime image)
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/.env ./
COPY --from=build /app/dist /app/dist

RUN npm install --production

EXPOSE 4000

CMD ["npm", "run", "start:prod"]