# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vite app
RUN npm run build

# Use a lightweight web server to serve the built files
RUN npm install -g serve

# Expose the port Vite uses
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "dist", "-l", "3000"]