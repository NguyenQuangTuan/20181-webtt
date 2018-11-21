FROM node:9.11.1-alpine
RUN mkdir -p /usr/src/ptpmcn-sales-page
WORKDIR /usr/src/ptpmcn-sales-page
COPY package.json /usr/src/ptpmcn-sales-page
RUN npm install gulp -g
RUN npm install
COPY . /usr/src/ptpmcn-sales-page
RUN gulp
EXPOSE  8080
CMD [ "node", "bin/www" ]
