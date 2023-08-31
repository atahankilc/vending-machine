FROM node:19-alpine

WORKDIR /app

RUN npm install -g serve

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build"]