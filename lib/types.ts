import {
    PlaywrightTestArgs,
    PlaywrightTestOptions, PlaywrightWorkerArgs,
    PlaywrightWorkerOptions
} from "@playwright/test";


type TestFixtures =
    PlaywrightTestArgs
    & PlaywrightTestOptions
    & PlaywrightWorkerOptions
    & PlaywrightWorkerArgs

type Command<T extends (...args: any) => any> =
    T extends (...args: infer A) => infer R
        ? (...args: A) => R extends PlaywrightCypress.Chainable ? R : PlaywrightCypress.Chainable<R>
        : never;

export type {TestFixtures, Command}