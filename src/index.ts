/// <reference path="../types.d.ts" />

import express from 'express';
import dotenv from 'dotenv'; dotenv.config();
import fs from 'fs';
import { createCache, getCache } from './lib/reader';
import path from 'path';
import getCachePath from './lib/utils/getCachePath';

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Yes, I am alive');
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