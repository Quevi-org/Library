export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string
            DATABASE: string
            CACHE?: string
            TEST_FOLDER_WITH_DIRECTORIES?: string
            TEST_FOLDER_WITH_QUESTIONS?: string
            TEST_QUESTION?: string
        }
    }
}