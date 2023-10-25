console.log('content script ran');

// ----- Config -----

const themeMode = 'minty'
const themeLight = 'light'
const urlGoogle = "https://www.google.com/";
const urlYandex = "https://www.google.com/";
const urlDuckDuckGo = "https://www.google.com/";
const urlBing = "https://www.google.com/";
const urlYahoo = "https://www.google.com/";
const sEngineUrls = [urlGoogle, urlYandex, urlDuckDuckGo, urlBing, urlYahoo]

// ----- Init -----

window.addEventListener('load', async () => {
    // TODO, get document input instead timeout
    // get theme
    console.log('!!! DOMContentLoaded');

    // getStorageItem('theme', function (interrupted) {
    //     if (theme) {}
    // });
});

// ----- Utils -----

// Use background.js instead?
function setStorageItem(varName, data) {}

function getStorageItem(varName, callback) {}

// ----- Create html -----

function createInput() {}