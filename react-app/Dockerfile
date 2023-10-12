FROM node:17

#ENV http_proxy "http://user:'password'@proxy.example.com:8080/"
#ENV https_proxy "http://user:'password'@proxy.example.com:8080/"

WORKDIR /var/www/
COPY app ./app
WORKDIR /var/www/app/
RUN npm install 
EXPOSE 80
CMD [ "npm", "start" ]
