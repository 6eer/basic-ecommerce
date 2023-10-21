# Use the official Node.js image from the DockerHub
FROM node:20-alpine3.17

# Set the working directory inside the docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json before other files
# Utilize cache on step where npm install is called
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Install bash
RUN apk add --no-cache bash

# Install wait-for-it
ADD https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh /usr/wait-for-it.sh
# Command to run the application
RUN chmod +x /usr/wait-for-it.sh
