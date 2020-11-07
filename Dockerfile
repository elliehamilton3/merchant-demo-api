FROM node:13-alpine

# Create app directory
ENV NODE_PATH /usr/node_modules
WORKDIR /usr/node_modules

# Install app dependencies
COPY package.json .

RUN npm install

WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Run app
CMD [ "npm", "start" ]