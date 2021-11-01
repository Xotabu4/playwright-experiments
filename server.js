import { exec, execSync } from 'child_process'
import { readFile, readdir } from 'fs/promises';
import express from 'express';
import crypto from 'crypto'


const app = express()
app.use(express.json());
const port = 3001

app.get('/tests', async (req, res) => {
    execSync('PLAYWRIGHT_JSON_OUTPUT_NAME=results.json playwright test --list --reporter json')
    const json = JSON.parse(await readFile(new URL('./results.json', import.meta.url)));
    res.send(json)
})

app.get('/launches', async (req, res) => {
    const launchesFiles = await readdir('./launches')
    const launchesIds = launchesFiles.map(lf => lf.replace('.json', ''))
    res.send(launchesIds)
})

app.get('/launch/:uuid', async (req, res) => {
    try {
        const json = JSON.parse(await readFile(new URL(`./launches/${req.params.uuid}.json`, import.meta.url)));
        res.send(json)
    } catch (err) {
        res.send(err)
    }    
})

app.post('/run/sync', async (req, res) => {
    const uuid = crypto.randomUUID()
    console.time(uuid)
    execSync(`PLAYWRIGHT_JSON_OUTPUT_NAME=./launches/${uuid}.json playwright test ${req.body.file} -g "${req.body.grep}" --reporter json`)
    console.timeEnd(uuid)
    const json = JSON.parse(await readFile(new URL(`./launches/${uuid}.json`, import.meta.url)));
    res.send(json)
})

app.post('/run/async', async (req, res) => {
    const uuid = crypto.randomUUID()
    exec(`PLAYWRIGHT_JSON_OUTPUT_NAME=./launches/${uuid}.json playwright test ${req.body.file} -g "${req.body.grep}" --reporter json`)
    res.send({
        launchUuid: uuid,
    })
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
