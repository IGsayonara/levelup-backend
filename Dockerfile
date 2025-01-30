# Updated Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

# Install Nest CLI globally
RUN npm install -g @nestjs/cli

COPY --chown=app:app . /app

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
