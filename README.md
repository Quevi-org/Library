# QRepeat Library

This is the server part, in where people can host their own questions to be accessed by a QRepeat instance

## Installation
1. Install [node.js](https://nodejs.org/en/) and [Git](https://git-scm.com/)
2. Fork it
    ```sh
    git clone https://github.com/QRepeat/Library
    ```
3. Enter the created folder and create an .env file in the root with those contents:
    ```env
    PORT=8000 #port to start server
    DATABASE=../DB #where your questions are stored
    CACHE=.cache.json #where you want to store the cache
    NODE_ENV=production
    ```
4. Install pnpm and all dependencies (you can ignore `--dev` if you can build it with tsc)
    ```sh
    npm install -g pnpm
    pnpm i --dev
    ```
5. Test and build it
    ```sh
    pnpm run test
    pnpm run build
    ```

## Running
```sh
pnpm run start
```

## FAQ

### Why "Library"
We (A user) like to think if it was like a "library of questions"