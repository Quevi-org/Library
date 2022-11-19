import fs from "fs/promises"
import getCachePath from "../utils/getCachePath"

export let storedCache: DirCache

export default async (cache: string = getCachePath()) => {
    if (storedCache == null) storedCache = await readCache(cache)
    return storedCache
}

export const readCache = async (cache: string = getCachePath()): Promise<DirCache> => {
    return JSON.parse(await fs.readFile(cache, {encoding: "utf-8"}))
}