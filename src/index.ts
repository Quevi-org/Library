/// <reference path="../types.d.ts" />

import express, {Request} from 'express';
import dotenv from 'dotenv'; dotenv.config();
import fs from 'fs';
import { createCache, getAllDirsFromDir, getCache, getDirFromPath, getQuestion, getRandomDirectory, getRandomQuestion } from './lib/reader';
import path from 'path';
import getCachePath from './lib/utils/getCachePath';
import cors from "cors"

const app = express();
const port = process.env.PORT;

app.use(cors())

app.get('/', (req, res) => {
    res.send('Yes, I am alive');
});

app.get('/question/*', async (req, res) => {
    const questionPath = decodeURI(req.path.substring('/question'.length))
    
    const question = await getQuestion(questionPath)
    
    if(question == null) res.status(404).send()
    else res.json(question);
});


app.get('/random(/*)?', async (req: Request<{}, {}, {exclude: string}>, res) => {
    //get the dir from path after /*, or fallback to /
    const dirPath = decodeURI(req.path.substring('/random'.length)) || "/"
    const dir = await getDirFromPath(dirPath)
    if (dir == null) {res.sendStatus(404); return}

    //get all dirs from that dir
    const allDirs = getAllDirsFromDir(dir)
    if(allDirs == null) {res.status(400).send("Empty folder"); return}
    allDirs.push(dir.path) //also add itself

    //filter the dirs for only ones with questions
    const filteredDirs = await Promise
        .all(allDirs.map(async dpath => await getDirFromPath(dpath)))
        .then(dirs => dirs.filter(dir => dir != null && Object.keys(dir.questions).length !== 0) as Directory[])

    //get a random question from the dirs with questions
    const randomQuestion = getRandomQuestion(filteredDirs[Math.floor(Math.random() * filteredDirs.length)])

    //send
    if(!randomQuestion.hasOwnProperty("answers")) res.sendStatus(500)
    else res.header("Cache-Control", "no-cache").json(randomQuestion)
});

(async () => {
    if(!fs.existsSync(process.env.CACHE ?? ".cache.json")) {
        console.log(`Creating cache in ${getCachePath()}`)
        await fs.writeFileSync(getCachePath(), JSON.stringify(await createCache(), undefined, process.env.NODE_ENV === "development" ? 2 : undefined))
    }

    console.log(`Loading cache in ${getCachePath()}`)
    getCache()
    
    app.listen(port, () => {
        console.log(`Library is running at http://localhost:${port}`);
    });
})()