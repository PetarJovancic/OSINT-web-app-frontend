FROM node:20.14-alpine

COPY . /

EXPOSE 3000

RUN npm i
RUN npm run build

CMD ["npm", "start"]