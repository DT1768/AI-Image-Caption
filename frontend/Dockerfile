#node
FROM node:alpine as nodebuilder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


#nginx
FROM nginx


WORKDIR /usr/share/nginx/html

COPY --from=nodebuilder /app/build /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]


