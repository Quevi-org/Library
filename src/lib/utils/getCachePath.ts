import path from "path";

export default () => path.resolve(process.env.CACHE ?? ".cache.json")