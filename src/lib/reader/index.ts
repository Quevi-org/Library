import path from "path"

export { default as createCache } from "./createCache"
import getCache from "./getCache"
export {default as getCache} from "./getCache"

// just tricky js to break for loops inside a function
const BreakError = {}

export const getDirFromPath = async (navPath: string): Promise<Directory> => {
    const cache = await getCache()
    if(navPath === "/") return cache

    const arrPath = path.normalize(navPath).split("/").filter(a => a)

    let searchResult: Directory = cache
    for (const folder of arrPath) {
        try {
            searchResult.directories.forEach(dir => {
                if (dir.name === folder) {
                    searchResult = dir
                    throw BreakError //break it
                }
            })
        } catch(e) {if(e !== BreakError) throw e}
    }

    return searchResult
}

export const getAllDirsFromDir = (dir: Directory) => {
    let dirs: string[] = []

    dir.directories.forEach(dir => {
        dirs.push(dir.path)
        if(dir.directories.length !== 0) dirs = [...dirs, ...getAllDirsFromDir(dir)]
    })

    return dirs
}

export const getRandomDirectory = (include: string[] | Directory, exclude?: string[]): string => {
    if(typeof include === 'object' && !Array.isArray(include)) include = getAllDirsFromDir(include as Directory)

    const element = include[Math.floor(Math.random() * (include.length - 1))]
    
    return (Array.isArray(exclude) && exclude.includes(element)) ? getRandomDirectory(include, exclude) : element;
}

export const getRandomQuestion = (dir: Directory) => {
    return dir.questions[Math.floor(Math.random() * (dir.questions.length - 1))]
}