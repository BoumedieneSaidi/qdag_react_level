FROM node:14-alpine AS builder
ENV NODE_ENV production
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
RUN npm install --production --no-audit
RUN npm install styled-components
# Copy app files
COPY . .
# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM docker.io/nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from builder
RUN mkdir /usr/share/nginx/html/qdag
COPY --from=builder /app/build /usr/share/nginx/html/qdag
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 3000
# Start nginx
CMD ["nginx", "-g", "daemon off;"]