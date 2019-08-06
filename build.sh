#!/bin/bash

MODE=${MODE:-production}
BRANCH=${BRANCH:-master}

#Build
docker build -t jsonata-rhino . --build-arg MODE=${MODE} --build-arg BRANCH=${BRANCH}
docker rm  jsonata-rhino
docker create --name jsonata-rhino jsonata-rhino
docker cp jsonata-rhino:/jsonata/dist .

#Cleanup
docker rm  jsonata-rhino
docker rmi -f jsonata-rhino
