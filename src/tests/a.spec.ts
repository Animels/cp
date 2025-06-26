import {test} from "../pw";


for (let i = 0; i < 10; i++) {
    test(`super test B ${i}`, async () => {
        pw.open("https://google.com")
        pw.newTab()
        pw.open("https://www.youtube.com/")
        pw.chooseTab(0)
        if (await pw.getElementAsync("text=Google")) {
            pw.getElement("[id='logo-icon']").click();
        } else {
            pw.getElement("[name='search_query']").click();
        }
    })
}



