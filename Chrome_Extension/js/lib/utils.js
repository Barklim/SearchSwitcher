window.utils = {};

function isObject(data) {
    return typeof data === 'object' && !Array.isArray(data) && data !== null;
}

function setStorageItem(varName, data) {
    const storageData = {};
    storageData[varName] = isObject(data) ? JSON.stringify(data) : data;

    chrome.storage.sync.set(storageData, function () {
        // console.log('Item saved:', varName);
        // console.log(storageData);
        // console.log('');
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

function removeStorageItem(varName) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.remove(varName, function (result) {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(result);
            }
        });
    });
}

function getDecoded(token) {
    if (token) {
        const decoded = jwt_decode(token);
        return decoded;
    }
    return null;
}

function getLSUserId() {
    return new Promise((resolve, reject) => {
        utils.getStorageItem('token', (result) => {
            const decoded = utils.getDecoded(result);
            if (decoded) {
                resolve(decoded.sub);
            } else {
                reject('Unable to decode the token');
            }
        });
    });
}

window.utils.setStorageItem = setStorageItem;
window.utils.getStorageItem = getStorageItem; 
window.utils.removeStorageItem = removeStorageItem; 
window.utils.getDecoded = getDecoded;
window.utils.getLSUserId = getLSUserId;
window.test = () => console.log('!!! test');