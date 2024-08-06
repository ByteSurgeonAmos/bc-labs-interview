# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container at /app
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Install TypeScript globally
RUN npm install -g typescript

# Copy the rest of the application code into the container
COPY . /app

# Compile TypeScript files
RUN tsc

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the application
CMD ["node", "dist/index.js"]
