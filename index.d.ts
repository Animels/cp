import {Queue} from "./lib/core";
import {TestFixtures} from "./lib/types";
import './commands/visit'

declare global {
    namespace PlaywrightCypress {
        interface Chainable<T = any> {
            asAsync: () => T;
        }
    }

    var queue: Queue
    var ps: PlaywrightCypress.Chainable;
    var fixtures: TestFixtures;
}

export {};