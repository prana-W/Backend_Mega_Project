# Lec - 7

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