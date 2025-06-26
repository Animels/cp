export interface PwGlobal {
    open: (page: string) => void;

    click: (selector: string) => void;

    newTab: () => void;

    chooseTab: (page: number) => void;
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
