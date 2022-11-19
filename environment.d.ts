export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string
            DATABASE: string
            CACHE?: string
        }
    }
}