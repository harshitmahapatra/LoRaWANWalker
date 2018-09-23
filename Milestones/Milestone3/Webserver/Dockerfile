FROM node:stretch

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY tsconfig.json ./

RUN npm install
COPY . .

RUN npm run build

# Bundle app source

# Our application listens on port 8080
EXPOSE 8080

# Start our application, this runs the "start" script defined in package.json
CMD [ "npm", "start"]
