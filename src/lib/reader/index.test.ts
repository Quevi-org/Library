import path from "path"
import {getDirFromPath, getCache, getAllDirsFromDir, getRandomDirectory, getRandomQuestion, createCache, getQuestion, getQuestionFromDir, isQuestion} from "./index"

// Note that all of the tests here uses the same test DB, so you'll have to tweak them
let testFolderWithDirectories = process.env.TEST_FOLDER_WITH_DIRECTORIES! // has only direcotires
let testFolderWithQuestions = process.env.TEST_FOLDER_WITH_QUESTIONS! // has questions
let testQuestion = process.env.TEST_QUESTION! // question itself

describe("💾 Reader lib", () => {
    describe("Cache checking", () => {
        it("should create an cache", async () => {
            const response = await createCache()

            expect(response.path).toBe("/")
            expect(response.directories.find(d => d.path === testFolderWithDirectories)).not.toBeUndefined()
        })

        it("should get the cache", async () => {
            const response = await getCache()
    
            expect(response.path).toBe("/")
        })
    })

    describe("Path manip checks", () => {
        describe("Directories", () => {
            it("should get a directory", async () => {
                const response = await getDirFromPath(testFolderWithQuestions)
        
                expect(response?.path).toBe(testFolderWithQuestions)
            })
            it("should fail with an inexistent directory", async () => {
                const response = await getDirFromPath("/penis")
                
                expect(response).toBeUndefined()
            })


            it("should get all dirs inside a dir", async () => {
                const response = getAllDirsFromDir((await getDirFromPath(testFolderWithDirectories))!)
        
                expect(response).toContain(testFolderWithQuestions)
            })
            it("should fail with an inexistent dir", async () => {
                const response = getAllDirsFromDir((await getDirFromPath("/penis"))!)
        
                expect(response).toBeUndefined()
            })
        })
        
        describe("Questions", () => {
            it("should get an specific question from a path", async () => {
                const response = await getQuestion(testQuestion)
                
                expect(response).toHaveProperty("answers")
            })
            it("should fail with an invalid question", async () => {
                const response = await getQuestion("/penis")
                
                expect(response).toBeUndefined()
            })
            it("should fail with using a folder as a question path", async () => {
                const response = await getQuestion(testFolderWithDirectories)
                
                expect(response).toBeUndefined()
            })


            it("should return true with a valid question path", async () => {
                const response = await isQuestion(testQuestion)
                
                expect(response).toBeTruthy()
            })
            it("should return false with an invalid question path", async () => {
                const response = await isQuestion("/penis")
                
                expect(response).toBeFalsy()
            })
            it("should return false with an directory path", async () => {
                const response = await isQuestion(testFolderWithDirectories)
                
                expect(response).toBeFalsy()
            })
        })

        it("should get an specific question from dir", async () => {
            const response = getQuestionFromDir((await getDirFromPath(path.dirname(testQuestion)))!, path.basename(testQuestion))
            
            expect(response).toHaveProperty("answers")
        })
    })

    describe("Random checking", () => {
        it("should get an random dir", async () => {
            const response = getRandomDirectory(getAllDirsFromDir((await getDirFromPath(testFolderWithDirectories))!)!)
            
    
            expect(getAllDirsFromDir((await getDirFromPath(testFolderWithDirectories))!)).toContain(response)
        })
    
        it("should choose a random question from a specific dir", async () => {
            const dir = (await getDirFromPath(testFolderWithQuestions))!
            const randomQuestion = getRandomQuestion(dir)
    
            expect(Object.values(dir.questions)).toContain(randomQuestion)
        })
    
        // it("should choose a random question from everything", async () => {
        //     const allDirs = getAllDirsFromDir((await getDirFromPath("/"))!)!
        //     const requestDir = async (): Promise<Directory> => {
        //         const dir = (await getDirFromPath(getRandomDirectory(allDirs)!))!
        //         return Object.keys(dir.questions).length === 0 ? requestDir() : dir
        //     }
        //     const randomDir = await requestDir()
        //     const randomQuestion = getRandomQuestion(randomDir)
    
    
        //     expect(Object.values(randomDir.questions)).toContain(randomQuestion)
        // })
    })
})
