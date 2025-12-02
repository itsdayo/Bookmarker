FROM node:18.13.0-alpine

WORKDIR /usr/src/app

COPY package*.json package-lock.json knexfile.js ./

RUN npm install --legacy-peer-deps

COPY . .
# Copy the startup script and make it executable
COPY start.sh ./
RUN chmod +x start.sh

EXPOSE 3100

# Run the startup script
CMD ["./start.sh"]