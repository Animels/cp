import {declareCommand} from "../lib/core";
import {Command} from "../lib/types";

declare global {
    namespace PlaywrightCypress {
        interface Chainable {
            visit: Command<typeof visit>;
            visitAsync: Command<typeof visitAsync>;
        }
    }
}


// async
const visitAsync = async (url: string) => {
    return await fixtures.page.goto(url);
}

// sync
const visit = (url: string) => ps.visitAsync(url)

declareCommand('visit', visit);
declareCommand('visitAsync', visitAsync);
