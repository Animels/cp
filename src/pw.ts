import {test as pwTest} from "@playwright/test";
import {PwContext, Queue} from "./pw-global";

const runContext = {
    contextPool: new Map<string, PwContext>(),
    push(guid: string, job: () => Promise<void>) {
        const context = this.contextPool.get(guid)
        if (!context) {
            return
        }
        context.q.push(job)
    },
    get(guid: string) {
        const context = this.contextPool.get(guid)
        if (!context) {
            throw new Error('Context not found')
        }

        return context
    },
    set(guid: string, context: Partial<PwContext>) {
        const oldContext = this.contextPool.get(guid)

        oldContext ? this.contextPool.set(guid, {...oldContext, ...context}) : this.contextPool.set(guid, {...context} as PwContext)

    }
}


export const test = async (name: string, cb: () => void) => {
    pwTest(name, async ({page, context}) => {
        const guid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        const q: Queue = []

        global.pw = {
            open(pageUrl) {
                q.push(async (guid) => {
                    await runContext.get(guid).currentPage.goto(pageUrl)
                })
            },
            click(selector) {
                q.push(async (guid) => {
                    const element = runContext.get(guid).currentPage.locator(selector);
                    await element.isVisible();
                    await element.click()
                })
            },
            newTab() {
                q.push(async (guid) => {
                    const newPage = await runContext.get(guid).context.newPage()
                    runContext.set(guid, {pages: [...runContext.get(guid).pages, newPage]})
                })
            },
            chooseTab(number) {
                q.push(async (guid) => {
                    const newActivePage = runContext.get(guid).pages[number]
                    runContext.set(guid, {currentPage: newActivePage})
                    await newActivePage.bringToFront();
                })
            }
        }
        runContext.set(guid, {q, pages: [page], context, currentPage: page})
        cb()


        if ((runContext.get(guid).q.length === 0) || !runContext.get(guid)) {
            return
        }

        for (const job of runContext.get(guid).q) {
            await job(guid)
        }
    })
}

