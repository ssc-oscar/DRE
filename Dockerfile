# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node as build-stage

RUN mkdir -p /opt/mern
WORKDIR /opt/mern
COPY package*.json /opt/mern/
RUN npm install
COPY ./ /opt/mern/
RUN npm run start

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx
COPY --from=build-stage /opt/mern/dist/ /usr/share/nginx/html
# Copy the default nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chown nginx.nginx /usr/share/nginx/html/ -R
