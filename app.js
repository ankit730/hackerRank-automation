/* Author : Ankit Kumar
This is a hackerRank automation project intended to auto submit code.
My learnings: Javascript, Promises, puppeteer
*/
userName = "<userName>";
password = "<Password>";
const fsPromise = require('fs').promises;
const puppeteer = require('puppeteer');
let browser = puppeteer.launch({
    headless:false,
    defaultViewport: null,
    args:['--start-maximized']
})

let gPage;
let gBrowser;
browser.then(function(browserIns){
    gBrowser = browserIns;
    let newPagePromise = browserIns.newPage();
    return newPagePromise;
})
.then(function(newPage){
    gPage = newPage;
    let openLinkPromise = gPage.goto('https://www.hackerrank.com');
    return openLinkPromise;
})
.then(function(){
    let waitAndClickPromise = waitAndClick('#menu-item-12851');
    return waitAndClickPromise;
})
.then(function(){
    let waitAndClickPromise = waitAndClick('[class="hr_button"]');
    return waitAndClickPromise;
})
.then(function(){
    let waitAndTypePromise = waitAndType('#input-1', userName);
    return waitAndTypePromise;
})
.then(function(){
    let waitAndTypePromise = waitAndType('input[type="password"][id="input-2"]', password);
    return waitAndTypePromise;
})
.then(function(){
    let waitAndClickPromise = waitAndClick('button[data-analytics="LoginPassword"]');
    return waitAndClickPromise;
})
.then(function(){
    let waitAndClickPromise = waitAndClick('div[class="topic-name"][data-automation="data-structures"]');
    return waitAndClickPromise;
})
.then(function(){
   let waitForQuestionsPromise= gPage.waitForSelector('div[class="challenges-list"]', {timeout: 5000});
    return waitForQuestionsPromise;
})
.then(function(){
    let waitForQuestionsListPromise = gPage.$$('div.challenges-list a.js-track-click.challenge-list-item');
    return waitForQuestionsListPromise;
})
.then(function(questions){
    //console.log(questions);
    let textContent = questions[0].evaluate(element=>element.click());
    return textContent;
    
}).then(function(){
    let selectLanguagePromise = waitAndClick('.custom-select.select-language');
    return selectLanguagePromise;
    
})
.then(function(){
    let typeJavaPromise = gPage.type('.custom-select.select-language', "Java 8", {delay: 40});
    return typeJavaPromise;
})
.then(function(){
    let enterJavaPromise = gPage.keyboard.press('Enter');
    return enterJavaPromise;
})
. then(function(){
    let clickOnEditorPromise = gPage.click('.monaco-editor');
    return clickOnEditorPromise;
})
.then(function(){
    let pressCtrlPromise = gPage.keyboard.down('Control');
    return pressCtrlPromise;
})
.then(function(){
    let pressAPromise = gPage.keyboard.press('A');
    return pressAPromise;
})
.then(function(){
    let pressXPromise = gPage.keyboard.press('X');
    return pressXPromise;
})
.then(function(){
    letReleaseCtrlPromise = gPage.keyboard.up('Control');
    return letReleaseCtrlPromise;
})
.then(function(){
    let codeToSubmitPromise = fsPromise.readFile("./sampleCode.java","utf-8");
    return codeToSubmitPromise;
})
.then(function(code){
   // console.log(code);
    letTypeCodeInEditorPromise = gPage.type('.monaco-editor', code);
    return letTypeCodeInEditorPromise;
})
.then(function(){
    letRunCodePromise = gPage.click('button.hr-monaco__run-code');
    return letRunCodePromise;
})
.then(function(){
    console.log("run is successfull");
})
.catch(function(err){
    console.log(err);
})
.finally(function(){
    gBrowser.close();
})


/*
@params : selector
returns : Waits for the selector and returns the promise after clicking the selector
*/
function waitAndClick(selector){
    return new Promise(function(resolve, reject){
        let waitPromise = gPage.waitForSelector(selector);
        waitPromise.then(function(){
            let clickPromise = gPage.click(selector);
            resolve(clickPromise);
        }).catch(function(err){
            reject(err);
        })
    });
}

/*
@params : selector to be selected
          content to be typed

returns : Types the content in the selector and returns a Promise
*/
function waitAndType(selector, content){
    return new Promise(function(resolve, reject){
        let waitPromise = gPage.waitForSelector(selector);
        waitPromise.then(function(){
            let typePromise = gPage.type(selector, content, {delay:80});
            resolve(typePromise);
        }).catch(function(err){
            reject(err);
        })
    });
}

