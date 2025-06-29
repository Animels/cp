import test from "@playwright/test";
import {TestFixtures} from "./types";

class Queue {
    queue: Array<((() => any) & {
        result?: any
    })> = [];

    async runQueue() {
        for (const task of this.queue) {
            task.result = await task();
        }
    }

    getQueueLength = () => this.queue.length;
    getTask = (index: number) => this.queue[index];
    enqueue = (task: (...args: any[]) => any) => this.queue.push(task);
    clearQueue = () => this.queue = [];
}

const it = async (name: string, executor: () => Promise<void>) => {
    test(name, async ({
                          context,
                          page,
                          browserName,
                          browser,
                          contextOptions,
                          connectOptions,
                          defaultBrowserType,
                          launchOptions,
                          baseURL,
                          channel,
                          actionTimeout,
                          navigationTimeout,
                          clientCertificates,
                          bypassCSP,
                          deviceScaleFactor,
                          extraHTTPHeaders,
                          httpCredentials,
                          ignoreHTTPSErrors,
                          testIdAttribute,
                          colorScheme,
                          hasTouch,
                          headless,
                          isMobile,
                          javaScriptEnabled,
                          locale,
                          offline,
                          geolocation,
                          proxy,
                          permissions,
                          request,
                          playwright,
                          screenshot,
                          serviceWorkers,
                          trace,
                          storageState,
                          timezoneId,
                          video,
                          userAgent,
                          viewport,
                          acceptDownloads
                      }, testInfo) => {
        const args: TestFixtures = {
            context,
            page,
            browserName,
            browser,
            contextOptions,
            connectOptions,
            defaultBrowserType,
            launchOptions,
            baseURL,
            channel,
            actionTimeout,
            navigationTimeout,
            clientCertificates,
            bypassCSP,
            deviceScaleFactor,
            extraHTTPHeaders,
            httpCredentials,
            ignoreHTTPSErrors,
            testIdAttribute,
            colorScheme,
            hasTouch,
            headless,
            isMobile,
            javaScriptEnabled,
            locale,
            offline,
            geolocation,
            proxy,
            permissions,
            request,
            playwright,
            screenshot,
            serviceWorkers,
            trace,
            storageState,
            timezoneId,
            video,
            userAgent,
            viewport,
            acceptDownloads
        }

        global.queue = new Queue();
        global.fixtures = args;
        global.ps = {
            asAsync: async <T>(): Promise<T> => {
                await queue.runQueue();
                const currentQueueLength = queue.getQueueLength();
                const result = queue.getTask(currentQueueLength - 1).result;
                queue.clearQueue()
                return result;
            },
        } as PlaywrightCypress.Chainable;

        require('../commands')

        await executor()
        await queue.runQueue()
    })
}

const declareCommand = <T, U extends any[], K extends keyof PlaywrightCypress.Chainable>(name: K, command: (...args: U) => T) => {
    ps[name] = ((...args: U) => {
        queue.enqueue(() => command(...args));
        return ps
    }) as PlaywrightCypress.Chainable[K]
}

export {it, Queue, declareCommand}