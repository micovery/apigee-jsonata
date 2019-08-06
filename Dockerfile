FROM ubuntu:16.04

ARG quiet='-q -y -o Dpkg::Use-Pty=0'

#Install node.js
RUN apt-get update $quiet &&\
    apt-get install $quiet curl &&\
    curl -sL https://deb.nodesource.com/setup_10.x |  bash - &&\
    apt-get update $quiet  &&\
    apt-get install $quiet nodejs git

ARG BRANCH

#Install jsonata & webpack dependencies
RUN git clone https://github.com/jsonata-js/jsonata.git &&\
    cd jsonata &&\
    git checkout -b build ${BRANCH} &&\
    npm install &&\
    npm install --save-dev \
      @babel/core \
      @babel/plugin-proposal-class-properties \
      @babel/plugin-transform-regenerator \
      @babel/plugin-transform-runtime \
      @babel/preset-env \
      babel-loader \
      string-replace-loader \
      webpack \
      webpack-cli

#Copy build files
COPY ./jsonata /jsonata


ARG MODE

RUN cd jsonata && ./node_modules/.bin/webpack