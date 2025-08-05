# ====== Build phase ======
FROM node:20-alpine AS builder

WORKDIR /app

# Copy chỉ những file cần thiết để cài đặt trước
COPY package.json package-lock.json* ./

# Cài đặt sớm để tận dụng layer cache
RUN npm install

# Copy phần còn lại sau khi đã cache node_modules
COPY . .

# Build app React
RUN npm run build

# ====== Serve phase ======
FROM nginx:stable-alpine

# Copy build vào Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx config nếu có
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
