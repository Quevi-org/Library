# Questin Library

This is the server part, in where people can host their own questions to be accessed by a Questin instance

## Installation
1. Install [node.js >18.0.0](https://nodejs.org/en/) and [Git](https://git-scm.com/)
2. Fork it
    ```sh
    git clone https://github.com/Questin-js/Library
    ```
3. Enter the created folder and create an .env file in the root with those contents:
    ```env
    PORT=8000 # Port
    DATABASE=../DB # Database location
    CACHE=.cache.json # (optional) Cache location

    # TESTING - Ignore if you won't test with JEST
    TEST_FOLDER_WITH_DIRECTORIES = "/path/to/folder/with/folders" # a folder with directories (having questions isn't necessary)
    TEST_FOLDER_WITH_QUESTIONS = "/path/to/folder/with/questions" # a folder with questions (having folders isn't necessary)
    TEST_QUESTION = "/path/to/question" # a question
    ```
4. Install pnpm and all dependencies
    ```sh
    npm install -g pnpm
    pnpm i --dev
    ```
5. Test and build it
    ```sh
    pnpm run build
    pnpm run test # note that you'll need to have the server to be on to run API tests
    ```

## Running
```sh
pnpm run start
```

## FAQ

### Why "Library"
We (A user) like to think if it was like a "library of questions"