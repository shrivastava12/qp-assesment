FROM node:18

WORKDIR /Users/pa40084004/project/nodejs/inventory-app/grocery

COPY package*.json ./

RUN npm install
RUN npm install mysql2 
RUN npm install nodemon --save-dev
COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]