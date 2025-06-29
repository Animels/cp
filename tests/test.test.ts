import test from "@playwright/test";
import {it} from "../lib/core";

test.describe('Test Suite', () => {
    it('Visit', async () => {
        // const result1 = await ps.visit('https://google.com').asAsync()
        // console.log("I Resulted in:", result1?.url());
        // console.log('Queue Length', queue.getQueueLength())
        //
        // const result2 = await ps.visit('https://latest.freightpop.com').asAsync()
        // console.log("II Resulted in:", result2?.url());
        // console.log('Queue Length', queue.getQueueLength())

        ps.visit('https://github.com')
        ps.visitAsync('https://google.com')
        // console.log('Queue Length', queue.getQueueLength())
        //
        // console.log('Running Queue... I', queue.queue)
        // const result3 = ps.visitAsync('https://google.com')
        // console.log('Running Queue... II', queue.queue)
        // const intermedialeResult = await result3.asAsync()
        //
        // console.log("III Resulted in:", intermedialeResult?.url());
        // console.log('Queue Length', queue.getQueueLength())

        // const result4 = await ps.visitAsync('https://latest.freightpop.com').visit('https://github.com').asAsync()
        // console.log("II Resulted in:", result4?.url());
    })
})

