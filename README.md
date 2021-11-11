# AdvancedJS-CA1-RESTful-API-Node-Express-Mongodb
Backend RESTful API for jobs build in Node.js using Express.js & MongoDB

The application allows user to login, register, logout, send forgot password, update current password, update user profile, delete account, see the jobs published by user type employeer, get all users as an admin and delete users as an admin.

The user that has a role of user is only able to see the jobs created by the user with the role of an employeer and admin. The user with role of user is also able to filter the jobs, sort the jobs, search the jobs by title, see the statistic about the jobs and paginate the jobs when viewing them.

The user with the role employeer is able to create new jobs, view jobs, update jobs and delete the jobs.
The user with the role admin is allowed to do all the functionality as he is authenticated and authorized to do so.

## Install all Dependencies
```
npm install/ i 
```
## Run the application either in development mode or production mode
```
Development mode
npm run dev
```
```
Production mode
npm run prod
```
## Config.env
Replace all environment variables values with your's. Use the exampleconfig.env and rename it to config.env
For the application to connect to the Mongodb database you need to provide your own Mongodb url
In order to run it go to the config.env under the DB_LOCAL_URI = mongodb://localhost:27017/jobs 
Type DB_URI = mongodb+srv://<username>:<password>@sandbox.yqojm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

