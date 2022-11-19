const fs = require("fs/promises")
const dotenv = require("dotenv"); dotenv.config()
//@ts-ignore
const {default: createCache} = require("../dist/lib/reader/createCache");

(async () => {
    await fs.writeFile(process.env.CACHE ?? ".cache.json", JSON.stringify(await createCache(), null, process.env.NODE_ENV === "development" ? 2 : null))
})()