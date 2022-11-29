import path from "path"

export { default as createCache } from "./createCache"
import getCache from "./getCache"
export {default as getCache} from "./getCache"

// just tricky js to break for loops inside a function
const BreakError = {}

export const getDirFromPath = async (navPath: string) => {
    const cache = await getCache()
    if(navPath === "/") return cache

    const arrPath = path.normalize(navPath).split("/").filter(a => a)

    let searchResult: Directory | undefined = cache
    for (const folder of arrPath) {
        const index = searchResult.directories.findIndex(d => d.name === folder)
        if(index === -1) {
            searchResult = undefined
            break
        } else {
            searchResult = searchResult.directories[index]
        }
    }

    return searchResult
}

export const getAllDirsFromDir = (dir: Directory) => {
    if (dir == null) return
    let dirs: string[] = []

    dir.directories.forEach(dir => {
        dirs.push(dir.path)
        if(dir.directories.length !== 0) dirs = [...dirs, ...getAllDirsFromDir(dir)!]
    })

    return dirs
}

export const getRandomDirectory = (include: string[] | Directory, exclude?: string[]): string => {
    if(typeof include === 'object' && !Array.isArray(include)) include = getAllDirsFromDir(include as Directory)!

    const element = include[Math.floor(Math.random() * (include.length - 1))]
    
    return (Array.isArray(exclude) && exclude.includes(element)) ? getRandomDirectory(include, exclude) : element;
}

export const getRandomQuestion = (dir: Directory) => {
    return Object.values(dir.questions)[Math.floor(Math.random() * (Object.keys(dir.questions).length - 1))]
}

export const getQuestion = async (navPath: string) => {
    if (!await isQuestion(navPath)) return undefined
    const dirPath = path.dirname(path.normalize(navPath))
    const questionName = path.basename(navPath, path.extname(navPath))

    const dir = await getDirFromPath(dirPath)
    if(dir == null) return
    return getQuestionFromDir(dir, questionName)
}

export const getQuestionFromDir = (dir: Directory, name: string) => {
    return dir.questions[name]
}

export const isQuestion = async (navPath: string) => {
    const normalizedPath = path.normalize(navPath)
    const questionName = path.basename(navPath)
    if (await getDirFromPath(normalizedPath) == null) { //check if it is a valid directory
        const topDir = await getDirFromPath(path.dirname(normalizedPath))
        if (topDir != null) {
            if(topDir.questions[questionName] != null) return true
        }
    }
    return false
}