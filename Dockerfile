FROM node:latest
LABEL maintainer "siggame@mst.edu"

ADD . matchmaker
WORKDIR matchmaker

RUN npm run setup
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
