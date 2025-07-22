FROM node:24-alpine3.21

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm i

COPY . .

EXPOSE 5173

CMD ["npm","run","dev","--","--host"]