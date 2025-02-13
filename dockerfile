# Use a Node.js base image for building the React app
# Use an official Node.js runtime as a parent base image
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if it exists) to container directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code (source destination)
COPY . .

# Build the React app for production
RUN npm run build

# Use a smaller Nginx image for serving the static files
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=build /app/dist /var/www/html

# Configure Nginx (see step 2 below)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (or your chosen port)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]