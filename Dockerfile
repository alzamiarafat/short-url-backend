FROM node:18.4.0-alpine

# Create app directory
WORKDIR /srv/www/app

# copying packages first helps take advantage of docker layers
COPY package*.json .

# For Development
RUN npm install

# Bundle app source
COPY . .

EXPOSE 5001

CMD ["npm", "run", "start"]
