declare interface Directory {
    name: string
    path: string
    questions: Question[]
    directories: Directory[]
}

//copy of DirectoryWithQuestions
declare interface DirCache extends Directory {}

declare interface Question {
    
}