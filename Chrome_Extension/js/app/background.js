console.log('background script ran');

// ----- Config -----

let dev = true;
let domain = dev ? "http://localhost:3000/" : 'https://someBackend.com/';

// ----- Init -----

// If you forward messages with the text css to each tab,
// then you will also need to forward it to new opening tabs using the onCreated method
// sendMessage(?) or use (chrome.scripting.executeScript && chrome.scripting.registerContentScripts)
// script.onload dont give text of script.
// can realize loader.js put text of scripts in some variables in window
//
// no success when take all computed styles from dom
// document.querySelectorAll('style') document.styleSheets
// fetch(chrome.runtime.getURL('../../css/darkly-bootswatch.css'))
//     .then(response => response.text())
//     .then(css => {
//     })
//     .catch(error => console.error(error));

// ----- Utils -----

const firstBackgroundCall = function () {
    // ajaxCall('GET', "user/me", {}, 'json', function (response) {
    //     console.log('response from server is: ', response)
    // });
}
// const timeout = setTimeout(firstBackgroundCall, 1000);

function ajaxCall(type, path, data, responseType, callback) {
    let token = '';
    getStorageItem('token', function (userData) {
        if (userData) {
            token = userData;
        }

        fetch(domain + path, {
            method: type,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: type === 'POST' ? JSON.stringify(data) : null
        })
            .then(response => {
                console.log('Response status code:', response.status);
                console.log('Response status code:', response);
                if (responseType === 'json') {
                    return response.json();
                } else {
                    return response.text();
                }
            })
            .then(response => {
                console.log('Response from server:', response);
                callback(response);
            })
            .catch(error => {
                console.error('Error:', error);
                callback({ error: 'Request failed' });
            });
    });
}

function setStorageItem(varName, data) {
    const storageData = {};
    storageData[varName] = data;

    chrome.storage.sync.set(storageData, function () {
        console.log('Item saved:', varName);
    });
}

function getStorageItem(varName, callback) {
    chrome.storage.sync.get([varName], function (result) {
        if (result[varName]) {
            const parsedData = result[varName];
            callback(parsedData);
        } else {
            callback(null);
        }
    });
}

// ----- Listeners -----

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.type) {
        case "login":
            console.log('login logic ran with formData =', message.data);
            let userLoginCreds = message.data;
            userLoginCreds.username = message.data.email.split('@')[0];
            ajaxCall("POST", "authentication/sign-in", userLoginCreds, 'json', function (response) {
                console.log('response from server is: ', response.accessToken);
                setStorageItem('token', response.accessToken);
                sendResponse(response);
            });
            break;
        case "signup":
            console.log('signup logic with formData =', message.data);
            let userCreds = message.data;
            userCreds.username = message.data.email.split('@')[0];
            ajaxCall("POST", "authentication/sign-up", userCreds, 'json', function (response) {
                console.log('response from server is: ', response);
                sendResponse(response);
            });
            break;
        case "initWelcomePage":
            console.log('login logic ran with formData =', message.data);
            let id = message.data.id;
            ajaxCall("GET", `users/${id}`, {}, 'json', function (response) {
                console.log('response from server is: ', response);
                sendResponse(response);
            });
            break;    
        default:
            console.log('couldnt find matching case');
    }
    return true;
});