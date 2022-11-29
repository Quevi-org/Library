import 'jest-expect-message';

test("🧪 Env Variables", () => {
    expect(process.env.DATABASE, "You should include the enviorment variable DATABASE in the .env file").not.toBeUndefined()
    expect(process.env.PORT, "You should include the enviorment variable PORT in the .env file").not.toBeUndefined()
    expect(process.env.TEST_FOLDER_WITH_DIRECTORIES, "You should include the enviorment variable TEST_FOLDER_WITH_DIRECTORIES in the .env file if you want to execute tests").not.toBeUndefined()
    expect(process.env.TEST_FOLDER_WITH_QUESTIONS, "You should include the enviorment variable TEST_FOLDER_WITH_QUESTIONS in the .env file if you want to execute tests").not.toBeUndefined()
    expect(process.env.TEST_QUESTION, "You should include the enviorment variable TEST_QUESTION in the .env file if you want to execute tests").not.toBeUndefined()
})

let apiURL = `http://localhost:${process.env.PORT}`

describe("📨 API Tests (Requires the API to be avaiable)", () => { //btw does somebody know how to skip this if the API is down?

    // it("avaiability of API", async () => {
    //     // If you're reading this error afer you ran a test, very likely the API is down. You should run the tests while it is on if you want to test the APIs
    //     expect(fetch(apiURL)).resolves.toReturn()
    // })

    describe("Random question calling", () => {
        it("should be able to get a question from root", async () => {
            const response = await fetch(`${apiURL}/random`)
            const question: Question = await response.json()

            expect(question).toHaveProperty("answers")
        })
        it("should get a question from a specific directory", async () => {
            const response = await fetch(`${apiURL}/random${process.env.TEST_FOLDER_WITH_QUESTIONS}`)
            const question: Question = await response.json()

            expect(question.path).toContain(process.env.TEST_FOLDER_WITH_QUESTIONS)
        })
        it("should be random", async () => {
            const timesToRefetch = 10
            let reqs: Question[] = []

            // loop each request. i wanted to use Array.fill and Promise.all but it would create only
            while (reqs.length !== timesToRefetch) { 
                const response = await fetch(`${apiURL}/random`)
                const json = await response.json()
                reqs.push(json)
            }

            const areEqual = reqs.every(element => {
                if (element === reqs[0]) return true
            })
            expect(areEqual, `All elements returned the same question after ${timesToRefetch} times. Maybe retry the test?`).not.toBeTruthy()
        })
        it("should fail when getting an random question from an invalid directory", async () => {
            const response = await fetch(`${apiURL}/random/penis`)
            
            expect(response.status).toBe(404)
        })
        it("should fail when getting get an random question from a question", async () => {
            const response = await fetch(`${apiURL}/random${process.env.TEST_QUESTION}`)
            
            expect(response.status).toBe(404)
        })
    })
    
    describe("Specific question calling", () => {
        it("should return an specific question", async () => {
            const response = await fetch(`${apiURL}/question${process.env.TEST_QUESTION}`)
            const question: Question = await response.json()

            expect(question).toHaveProperty("answers")
            expect(question.path).toBe(process.env.TEST_QUESTION)
        })
        it("should fail when returning an invalid question", async () => {
            const response = await fetch(`${apiURL}/question/penis`)
            
            expect(response.status).toBe(404)
        })
        it("should fail getting a question that is a folder", async () => {
            const response = await fetch(`${apiURL}/question${process.env.TEST_FOLDER_WITH_QUESTIONS}`)
            
            expect(response.status).toBe(404)
        })
    })
})