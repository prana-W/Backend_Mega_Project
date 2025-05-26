# Lec - 7 (Mega-Project Setup)

- We make basic file structures, add public and src directory.
- Use gitignore generators to generate it for any type of project. Here we have generated for node.
- To quickly generate files, go to that directory and run `touch abc.xyz`. Example, `touch index.js`
- To make directory use `mkdir abc`
- We also change type from commonjs to module inside `package.json` because we want to use import syntax and not the require syntax.
- After this, we setup `nodemon`
  - This automatically restarts our server, whenever our file is saved, that is any change is made to our app, eliminating the need to manually stop and restart the server.
  - We install nodemon as a dev dependency `npm install --save-dev nodemon`, as we only need it in development and not in production, there we scroll a little in the npm nodemon and check for the development dependency command for installing it.
  - Now add a script for `dev` inside the `package.json` that starts nodemon for src/index.js
- Do `mkdir controllers db middlewares models routes utils` inside the src folder. This will be our basic project structure.
- Do `npm i -D prettier`. Installing it as a dev dependency.
  - Now add a `.prettierrc` file to the root directory and add basic configuration in it.
  - Now add a `.prettierignore` file as well. Add files that we want prettier to ignore

# Lec-8 (Connecting Database)

- Go to Atlas Compass. Make our project and set up our cluster. Then add network access and database access. Then connect the cluster by clicking on Compass. From there copy the URI (string) and paste it in the .env file, there replace the <db-password> with the password of the admin (which we set up in the database).
- Also include PORT in the .env file
- CAUTION!!! Remove the last slash in the URI (string) that we copy and pasted in the .env file.
- Now we add the name of our application in `constants.js`. This is done, so that we don't have to manually change the name evrywhere in future, if we want. 
  - We could  have also used .env file to do the same, but name of the file is not a sensitive information, that's why keeping it in such a file doesn't make that sense.
- We also need to do `npm i dotenv mongoose express`as we are working with .env file, mongoose and express
- dotenv is used, since we want to populate whatever is inside our .env file into our root directory as soon as the project starts.
  - To do so we can simply do `require('dotenv').config({path: './env'})`
  - But since we have changed the type in package.json from commonjs to module, we can't use require statement anymore!!
    - For that we can use add a small line in our dev script in package.json 

## NOTE!!!

As of node verion 20.x.x, we can use .env natively that means, there is no need to install dotenv package. Just simply put `node --env-file=.env abc.js` as a start/dev script. Here --env-file=.env poupulates our .env file content into process.env all around the app. But since we are using nodemon here instead of node, we are still using dotenv. Things might change in the future, so kindly check these things and debug it if getting error. 

### Keep in Mind!!

- Database is in another continent! Therefore, async-await needs to be used.
- Errors can occur in Database connection, therefore always wrap in try-catch block or use Promises (resolve, reject)

### Connection with Database (using Mongoose)

1. In index.js 

- Here, we use IIFE (async IIFE)
- Inside add try-catch block for error handling. For the link, use the MONGODB_URI stored in .env file followed by DB_NAME stored in constants.js. Connect both using /

2. In db directory and importing the function in the index.js


- `process` is a feature of Node.js

# Lec-9 (Custom API Response and error handling)

- Since connectDB() is returning a promise, we handle the promise by .then() and .catch()
- Setup app.js with express
- app.use() is used mostly  when using middleware.
- Now no `npm i cors cookie-parser`
- Now import both the packages in `app.js`
- Now we configure our cors and setup cors origin in our .env file
- We also do `app.use(express.json({}))`. This is a middleware and allows us to accept json format in our backend. Here we can also set limit to prevent the server from crashing.
- Now we also configure another middleware for getting data from the url by parsing it.
- Another configuration is express.static("public")
- cookieParser allows us to perform CRUD operation on the cookies of the user.
- In the server we can handle, err, req, res and next (next is used when using middlewares )
- Middlewares acts in the middle of the client and the server, such as providing checking if the user is logged in etc
- Now make a `asyncHandler.js` file inside `utils` directory.
  - This is made because we will be handling async function many times in the code, this is a production level practice.
- Now make a `apiError.js` file in the utils.
  - Here we will be using Error class by Node.js
- Read about HTTP Status code