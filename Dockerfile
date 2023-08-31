FROM node:alpine AS development

ENV NODE_ENV development

WORKDIR /react-app

COPY ./package.json /react-app
RUN npm install

COPY . .

ENV REACT_APP_GOOGLE_CLIENT_ID ""

CMD npm start