FROM node:lts-alpine3.19

# Set the working directory
WORKDIR /app

# Set environment variables
ARG Docker_PGDATABASE
ARG Docker_PGPASSWORD
ARG Docker_PGUSER
ARG Docker_PGHOST

# Set the environment variables
ENV Docker_PGDATABASE=$PGDATABASE
ENV Docker_PGPASSWORD=$PGPASSWORD
ENV Docker_PGUSER=$PGUSER
ENV Docker_PGHOST=$PGHOST

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install npm dependencies
RUN npm install -g npm@latest
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 8080
EXPOSE 8080

# Command to run the application
CMD ["npm", "run", "server"]
