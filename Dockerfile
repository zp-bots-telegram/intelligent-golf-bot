FROM node:20.12.2-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn run build

FROM node:20.12.2-alpine
ENV NODE_ENV=production
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY --from=0 /usr/src/app/package.json ./
COPY --from=0 /usr/src/app/dist ./dist
CMD yarn run start