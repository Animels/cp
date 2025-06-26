import {test} from "../pw";


for (let i = 0; i < 10; i++) {
    test(`super test A ${i}`, async () => {
        const flowA = async () => {
            pw.open('https://example.com');
            pw.getElement('h1')
        };

        const flowB = async () => {
            pw.newTab();
            pw.chooseTab(1);
            pw.open('https://example.org');
        };

        await Promise.all([
            flowA(),
            flowB(),
        ]);
    })
}



