# 1. Use the latest stable LTS
FROM ubuntu:24.04

# 2. Prevent interactive prompts during build
ENV DEBIAN_FRONTEND=noninteractive 

# 3. Combined update and install to reduce image layers
RUN apt-get update && apt-get install -y \
    texlive-full \
    texlive-latex-extra \
    texlive-fonts-recommended \
    texlive-fonts-extra \
    build-essential \
    curl \
    git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 4. Install Node.js 22 (Current 2026 LTS)
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs

# 5. Set the working directory
WORKDIR /app

# 6. Optimized dependency installation (use 'ci' for faster, consistent builds)
COPY package.json package-lock.json ./
RUN npm ci

# 7. Copy the rest of the application code
COPY . .

# 8. Build the Next.js application 
RUN npm run build

# 9. Expose the port
EXPOSE 3000

# 10. Start the application
# Use 'npm run start' to ensure Next.js production optimizations are active
CMD ["npm", "run", "start"]