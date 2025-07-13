FROM node:22-alpine

WORKDIR /app

ENV PORT=3000

COPY package*.json ./
COPY src ./src

RUN mkdir volume

RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "start"]