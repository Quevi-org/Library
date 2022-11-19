import fs from "fs/promises"
import directoryTree from "directory-tree"
import path from "path"

export default async (db: string = process.env.DATABASE) =>  {
    const dir = directoryTree(db, {
        extensions: /\.json/,
        attributes: ["type"],
        normalizePath: true
    })
    
    const transform: DirCache = await transformDirectory(dir)

    return transform
}

export const transformDirectory = async (dir: directoryTree.DirectoryTree) => {
    let structure: Directory = {
        name: dir.name,
        path: dir.path !== process.env.DATABASE ? path.normalize(dir.path.replace(path.normalize(process.env.DATABASE), "")) : "/",
        questions: [],
        directories: []
    }

    if (dir.children) for (const obj of dir.children) {
        if (obj.type === "file") {
            console.log(`Added file "${obj.path}" to the cache`)
            let json = JSON.parse(await fs.readFile(obj.path, "utf-8"))
            structure.questions.push(json)
        }
        else structure.directories.push(await transformDirectory(obj))
    }

    return structure
}