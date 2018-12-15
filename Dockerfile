FROM node:9.11.1
RUN mkdir -p /usr/src/wtt-frontend
WORKDIR /usr/src/wtt-frontend
COPY package.json /usr/src/wtt-frontend
RUN npm config set unsafe-perm true
RUN npm install
RUN npm install gulp -g
RUN npm install pm2 -g
COPY . /usr/src/wtt-frontend
RUN gulp
EXPOSE  8080
CMD [ "pm2-runtime", "./launcher/server.yml" ]
