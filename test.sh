#!/bin/bash

docker pull siggame/colisee-db
docker rm --force matchmaker-db
docker run --name matchmaker-db --publish 5432:5432 --detach siggame/colisee-db

npm run test

docker stop matchmaker-db