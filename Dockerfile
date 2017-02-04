FROM node:latest
LABEL maintainer "siggame@mst.edu"

ADD . matchmaker
WORKDIR matchmaker

RUN npm run setup
RUN npm run build

CMD ["npm", "start"]
