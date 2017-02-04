FROM node:latest

ADD . matchmaker
WORKDIR matchmaker

RUN npm run setup
RUN npm run build

CMD ["npm", "start"]
