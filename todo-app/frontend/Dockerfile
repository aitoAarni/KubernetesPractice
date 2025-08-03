FROM node:22-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

ARG VITE_API_URL=http://localhost:8081/api
ENV VITE_API_URL=$VITE_API_URL

COPY . .

RUN npm run build

FROM node:22-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist


EXPOSE ${PORT:-8080}

CMD [ "sh", "-c", "serve -s dist -l $PORT" ]