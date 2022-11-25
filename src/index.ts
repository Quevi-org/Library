/// <reference path="../types.d.ts" />

import express from 'express';
import dotenv from 'dotenv'; dotenv.config();
import fs from 'fs';
import { createCache, getCache, getQuestion } from './lib/reader';
import path from 'path';
import getCachePath from './lib/utils/getCachePath';

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Yes, I am alive');
});

app.get('/question/*', async (req, res) => {
    const questionPath = decodeURI(req.path.substring('/question'.length))
    console.log(req.path)
    
    const question = await getQuestion(questionPath)
    console.log(question)
    
    if(question == null) res.status(404).send()
    else res.json(question);
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