FROM node:22-alpine

WORKDIR /app


COPY package*.json ./
COPY src ./src

RUN mkdir volume

RUN npm install --omit=dev

EXPOSE ${PORT:-3000}

CMD ["npm", "start"]