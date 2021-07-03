# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
# FROM node as build-stage

FROM ubuntu:latest
                                                                                                      
ENV TZ=America/New_York
ENV DEBIAN_FRONTEND=noninteractive

RUN apt update && DEBIAN_FRONTEND='noninteractive' apt install -y  curl gnupg apt-transport-https

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4

RUN apt-get update -q \
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
    tmux vim-runtime tmux zsh libpng-dev \
    certbot \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
 && curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - \
 && sudo apt-get install -y nodejs

#RUN mkdir -p /opt/mern
#WORKDIR /opt/mern
#COPY package*.json /opt/mern/
#COPY ./ /opt/mern/
#ENV NODE_ENV development
#WORKDIR /opt/mern
#RUN npm install

# set up to work in a UTK environment
COPY euterpe-ilom_eecs_utk_edu_interm.cer /etc/ssl/
COPY sssd.conf /etc/sssd/ 
COPY common* /etc/pam.d/ 
RUN chmod 0600 /etc/sssd/sssd.conf /etc/pam.d/common* etc/sssd/* && \
  if [ ! -d /var/run/sshd ]; then mkdir /var/run/sshd; chmod 0755 /var/run/sshd; fi
COPY *.sh /bin/ 

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
#FROM nginx
#COPY --from=build-stage /opt/mern/dist/ /usr/share/nginx/html
# Copy the default nginx.conf
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#RUN chown nginx.nginx /usr/share/nginx/html/ -R
