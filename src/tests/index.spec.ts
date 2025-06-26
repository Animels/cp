import {test} from "../pw";

test('super test', () => {
    pw.open("https://google.com")
    pw.newTab()
    pw.open("https://www.youtube.com/")
    pw.chooseTab(0)
    pw.click("[value='Поиск в Google']")
})

