FROM node:18-alpine as builder
WORKDIR /usr/app
COPY package*.json yarn.lock ./
RUN yarn config set registry https://registry.npmjs.org
RUN rm yarn.lock
RUN yarn
COPY . .
RUN yarn prisma generate
RUN yarn build
FROM node:18-alpine
WORKDIR /usr/app
COPY --from=builder /usr/app/dist ./dist
COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/logs ./logs
COPY --from=builder /usr/app/package*.json ./
EXPOSE 3000
CMD node dist/main.js