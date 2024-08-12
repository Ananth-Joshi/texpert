# Use the official Ubuntu base image
FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive 

# Update package lists
RUN apt-get update

# Install texlive-full
RUN apt-get install -y texlive-full

# Install build-essential
RUN apt-get install -y build-essential

# Install curl
RUN apt-get install -y curl

# Install git
RUN apt-get install -y git

#install extras
RUN apt-get install -y texlive-latex-extra
RUN apt-get install -y texlive-fonts-recommended
RUN apt-get install -y texlive-fonts-extra


# Clean up APT when done
RUN apt-get clean

# Remove cached package lists
RUN rm -rf /var/lib/apt/lists/*

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Command to start the Next.js application
CMD ["npm", "start"]
