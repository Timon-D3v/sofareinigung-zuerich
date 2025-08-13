FROM node:22.16.0-alpine3.20

WORKDIR /build

COPY package*.json .

RUN npm install --omit=dev
RUN npm cache clean --force

COPY . .

CMD ["node", "app.js"]