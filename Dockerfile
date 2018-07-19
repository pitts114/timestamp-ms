FROM node:8-onbuild

WORKDIR /app
COPY . /app
EXPOSE 5000
RUN npm install
CMD npm start