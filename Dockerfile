FROM node:latest
LABEL maintainer="siggame@mst.edu"

ADD . app
WORKDIR app

RUN npm run setup
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start-prod"]
