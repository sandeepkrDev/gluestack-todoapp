FROM gluestack/dapr-node:latest

# Install your app
WORKDIR /server
COPY package*.json ./
RUN ["npm", "install"]
COPY . .
EXPOSE 3500

# https://stackoverflow.com/a/56454994
RUN ["npm", "rebuild", "bcrypt", "--build-from-source"]

RUN ["npm", "install", "nodemon"]

# Run the app using Dapr
CMD ["sh", "-c", "dapr run --app-port 9090 --app-id \"auth\" --app-protocol \"http\" --dapr-http-port 3500 -- npm run dev"]
