declare interface Directory {
    name: string
    path: string
    questions: {[questionName: string]: Question}
    directories: Directory[]
}

//copy of Directory
declare interface DirCache extends Directory {}

declare interface Question {
    description: string
    answers: {
        [answerIdentifier: string]: {
            name: string
            value: boolean
        }
    }
}