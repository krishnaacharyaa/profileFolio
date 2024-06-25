# Use the official Node.js image
FROM node:22-alpine3.20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to start the Next.js application
CMD ["npm", "run", "dev"]
