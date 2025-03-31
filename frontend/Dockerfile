FROM node:22.11.0

# Set a work directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./

# Install dependencies (clean install for production)
RUN npm ci --only=production

# Copy application files
COPY .next .next
COPY app app
COPY public public

# Fix permissions (important for node_modules/.bin executables)
RUN chown -R node:node /app && \
    chmod -R 755 /app && \
    chmod +x node_modules/.bin/*

# Switch to non-root user for security
USER node

RUN npx next build

# EXPOSE the port of the application
EXPOSE 3000

# The command to start the app
CMD ["npm", "start"]

#CMD ["sh", "-c", "if [ -f .next/BUILD_ID ]; then next start; else npm run build && next start; fi"]