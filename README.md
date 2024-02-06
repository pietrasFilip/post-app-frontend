# post-web-app-frontend

This is frontend project for backend application called post-app-backend.

# How to run?

If you are using backend image as shown below (it is already in `docker-compose.yml` file):
```
    image: pietrasfilip/post-web-app-backend:1.0
```

Fill database environment variables in `docker-compose.yml` with:
```
    environment:
      MYSQL_DATABASE: post
      MYSQL_ROOT_PASSWORD: main
      MYSQL_USER: user
      MYSQL_PASSWORD: user1234
```
Open terminal inside this project directory, then perform below command:
```
docker-compose up -d --build
```
This will run containers with backend. When loaded properly perform below commands:

### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

If you have built `post-app-backend` application and run on your own (as shown in backend README.md file), then fill 
database variables inside `docker-compose.yml` with variables you used when creating .jar file.
Then just perform commands (backend app must be running):
### `npm install`
### `npm start`