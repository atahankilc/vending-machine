FROM node:19-alpine

WORKDIR /app

RUN npm install -g serve

COPY package.json /frontend

RUN npm install

COPY . /app

RUN npm run build

EXPOSE 3000

ENV REACT_APP_GOOGLE_CLIENT_ID ""

CMD ["serve", "-s", "build"]