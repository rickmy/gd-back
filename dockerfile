FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . /app

RUN yarn build