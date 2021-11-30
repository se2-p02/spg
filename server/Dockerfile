# pull official base image
FROM node:lts

# set working directory
WORKDIR /

# add `/app/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# add app
COPY . ./

EXPOSE 3001

# start app
CMD ["npm", "start"]