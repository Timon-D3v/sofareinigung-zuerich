FROM node:22.16.0-alpine3.20

WORKDIR /build

COPY package*.json .
COPY . .

RUN npm install --omit=dev
RUN npm cache clean --force

CMD ["node", "app.js"]