// Note that all of the tests here uses the same test DB, so you'll have to tweak them

import {getDirFromPath, getCache, getAllDirsFromDir, getRandomDirectory, getRandomQuestion} from "./index"

describe("💾 Reader lib", () => {
    let testFolderWithQuestions = "/PAS/2/Parte 1 (Língua Inglesa)"
    let testFolderWithDirectories = "/PAS"

    describe("Cache checking", () => {
        it.todo("should create an cache")

        it("should get the cache", async () => {
            const response = await getCache()
    
            expect(response.path).toBe("/")
        })
    })

    describe("Path manip checks", () => {
        it("should get a directory", async () => {
            const response = await getDirFromPath(testFolderWithQuestions)
    
            expect(response?.path).toBe(testFolderWithQuestions)
        })

        it("should fail with an inexistent directory", async () => {
            const response = await getDirFromPath("/penis")
            
            expect(response).toBeUndefined
        })

        it("should get all dirs inside a dir", async () => {
            const response = getAllDirsFromDir(await getDirFromPath(testFolderWithDirectories))
    
            expect(response).toContain(testFolderWithQuestions)
        })
        
        it.todo("should fail with an path that represents an question")
        it.todo("should get an specific question")
        it.todo("should fail with an invalid question")
    })

    describe("Random checking", () => {
        it("should get an random dir", async () => {
            const response = getRandomDirectory(getAllDirsFromDir(await getDirFromPath(testFolderWithDirectories)))
            
    
            expect(getAllDirsFromDir(await getDirFromPath(testFolderWithDirectories))).toContain(response)
        })
    
        it("should choose a random question from a specific dir", async () => {
            const dir = await getDirFromPath(testFolderWithQuestions)
            const randomQuestion = getRandomQuestion(dir)
    
            expect(dir.questions).toContain(randomQuestion)
        })
    
        it("should choose a random question from everything", async () => {
            const allDirs = getAllDirsFromDir(await getDirFromPath("/"))
            const requestDir = async (): Promise<Directory> => {
                const dir = await getDirFromPath(getRandomDirectory(allDirs))
                return dir.questions.length === 0 ? requestDir() : dir
            }
            const randomDir = await requestDir()
            const randomQuestion = getRandomQuestion(randomDir)
    
    
            expect(randomDir.questions).toContain(randomQuestion)
        })
    })
})
