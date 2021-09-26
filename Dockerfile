FROM node:14.16.1-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN yarn install --prefer-offline --frozen-lockfile
RUN yarn run build
RUN yarn install --production=true --prefer-offline --frozen-lockfile

FROM node:14.16.1-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY --from=0 /usr/src/app/node_modules ./node_modules
COPY --from=0 /usr/src/app/yarn.lock ./
COPY --from=0 /usr/src/app/package.json ./
RUN yarn install --production=true --prefer-offline --frozen-lockfile
COPY --from=0 /usr/src/app/build ./build
CMD yarn run start