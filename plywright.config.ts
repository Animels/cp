import {defineConfig} from "@playwright/test";


export default defineConfig({
    workers: 4,
    reporter: "html"
})