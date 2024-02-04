const puppeteer = require('puppeteer');
let browser = puppeteer.launch({
    headless:false,
    defaultViewport: null,
    args:['--start-maximized']
})

let gPage;

browser.then(function(browserIns){
    let newPagePromise = browserIns.newPage();
    return newPagePromise;
})
.then(function(newPage){
    gPage = newPage;
    let openLinkPromise = gPage.goto('https://www.hackerrank.com');
    return openLinkPromise;
})