import {Locator} from "@playwright/test";

export interface PwGlobal {
    open: (page: string) => void;

    newTab: () => void;

    chooseTab: (page: number) => void;

    getElementAsync: (selector: string) => Promise<Locator>;
    getElement: (selector: string) => { click: () => void };
}

export type Queue = ((guid: string) => Promise<void>)[];

export interface PwContext {
    q: Queue;
    pages: Page[];
    context: BrowserContext;
    currentPage: Page;
}

declare global {
    var pw: PwGlobal;
}


export {};
