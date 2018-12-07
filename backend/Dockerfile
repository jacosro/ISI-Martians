FROM node:8

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]