FROM ubuntu:18.04
MAINTAINER Audris Mockus (modified MERN.JS)

# 80 = HTTP, 443 = HTTPS, 3000 = MEAN.JS server, 35729 = livereload, 8080 = node-inspector
#EXPOSE 80 443 3000 35729 8080

#RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
#RUN echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.4.list
RUN apt-get update && apt install -y  gnupg apt-transport-https apt-utils

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 4B7C549A058F8B6B
#RUN echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.4.list

# Set development environment as default
ENV NODE_ENV development

# Install Utilities
RUN apt-get update -q  \
 && apt-get install -yqq \
 curl \
 git \
 ssh \
 gcc \
 make \
 build-essential \
 libkrb5-dev \
 sudo \
 apt-utils \
 iputils-ping \
 telnet \
 less \
    locales \
    libzmq3-dev \
    libssl-dev \
    libcurl4-openssl-dev \
    libopenblas-base \
    openssh-server \
    lsof sudo \
    fonts-dejavu \
    sssd \
    sssd-tools \
    vim \
    git \
    curl lsb-release \
    vim-runtime tmux zsh libpng-dev \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*


COPY eecsCA_v3.crt /etc/ssl/ 
COPY sssd.conf /etc/sssd/ 
COPY common* /etc/pam.d/ 
RUN chmod 0600 /etc/sssd/sssd.conf /etc/pam.d/common* 
RUN if [ ! -d /var/run/sshd ]; then mkdir /var/run/sshd; chmod 0755 /var/run/sshd; fi
COPY init.sh startsvc.sh notebook.sh startDef.sh /bin/ 



# Install nodejs
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN sudo apt-get install -yq nodejs  \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
     echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list &&\
     apt-get update && apt-get install yarn


# Install MEAN.JS Prerequisites
# RUN npm install --quiet -g gulp bower yo mocha karma-cli pm2
# && npm cache clean

RUN mkdir -p /opt/mern.js/public/lib 

WORKDIR /opt/mern.js

COPY . /opt/mern.js
# Copies the local package.json file to the container
# and utilities docker container cache to not needing to rebuild
# and install node_modules/ everytime we build the docker, but only
# when the local package.json file changes.
# Install npm packages
#COPY package.json /opt/mean.js/package.json
RUN npm install --quiet
# Install bower packages
#COPY bower.json /opt/mean.js/bower.json
#COPY .bowerrc /opt/mean.js/.bowerrc
#RUN bower install --quiet --allow-root --config.interactive=false
###########################################
###########################################
# Run MEAN.JS server
#CMD npm install && npm start
 
ENV NB_USER jovyan
ENV NB_UID 1000
ENV HOME /home/$NB_USER
RUN useradd -m -s /bin/bash -N -u $NB_UID $NB_USER && mkdir $HOME/.ssh && chown -R $NB_USER:users $HOME 
COPY id_rsa_gcloud.pub $HOME/.ssh/authorized_keys
RUN chown -R $NB_USER:users $HOME && chmod -R og-rwx $HOME/.ssh

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
RUN echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.0.list
RUN apt-get update -q  \
 && apt-get install \
 mongodb-org-shell \
 mongodb-org-tools 
