FROM node:22-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

ENV VITE_IMAGE_URL=http://localhost:8080/image

COPY . .

RUN npm run build

FROM node:22-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

ENV PORT=8080

EXPOSE $PORT

CMD [ "sh", "-c", "serve -s dist -l $PORT" ]

