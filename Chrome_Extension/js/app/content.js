// console.log('content script ran');

// ----- Config -----

const isDev = false;
const apiKey = 'AIzaSyBK_MJBnjnEHzV2McNber7SD75ixFGEtd0';
const customSearchEngineId = 'e79bb8ff5338048ae';
const DEBOUNCE_TIME = 800;
const themeMode = 'minty'
const themeLight = 'light'
const searchInputId = 'SSsearch';
const sourceCssLinks = ["css/darkly-bootswatch.css", "css/searchInput.css"];

let sswitcherState = 'close';
let searchEngineState = 'google';
const sswitcherKey = 'sswitcher';
const searchEngineKey = 'searchEngine';

const googleLogo = 'https://github.com/Barklim/course/blob/main/hostImg/sswitcher/google.png?raw=true';
const yandexLogo = 'https://github.com/Barklim/course/blob/main/hostImg/sswitcher/yandex.png?raw=true';
const duckLogo = 'https://github.com/Barklim/course/blob/main/hostImg/sswitcher/duck.png?raw=true';
const bingLogo = 'https://github.com/Barklim/course/blob/main/hostImg/sswitcher/bingo.png?raw=true';
const baiduLogo = 'https://github.com/Barklim/course/blob/main/hostImg/sswitcher/baidu.png?raw=true';
const yahooLogo = 'https://github.com/Barklim/course/blob/main/hostImg/sswitcher/yahoo.png?raw=true';
const urlGoogle = "https://www.google.com/";
const urlYandex = "https://www.google.com/";
const urlDuckDuckGo = "https://www.google.com/";
const urlBing = "https://www.google.com/";
const urlYahoo = "https://www.google.com/";
const sEngineUrls = [urlGoogle, urlYandex, urlDuckDuckGo, urlBing, urlYahoo];

// ----- Init -----

const body = document.getElementsByTagName('body')[0];
const shadowHost = document.createElement('div');
body.appendChild(shadowHost);
const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

window.addEventListener('load', async () => {
    const scriptCssPromises = sourceCssLinks.map(sourceLink => fetchScript(sourceLink));
    let arrCssContentText = [];
    const cssPromise = Promise.all(scriptCssPromises);

    Promise.all([cssPromise])
        .then(([cssScriptTexts]) => {
            // console.log("All CSS Scripts successfully loaded:");
            cssScriptTexts.forEach((scriptText, index) => {
                // console.log(`Script ${sourceCssLinks[index]}:\n`);
                arrCssContentText.push(scriptText);
            });

            createInput(arrCssContentText);
            initListeners()

        })
        .catch(error => {
            console.error("Error load scripts:", error);
        });
});

// ----- Create html -----

function createInput(arrCss) {
    const wrapperEl = document.createElement('div');
    wrapperEl.classList.add('SSwrapperContent');
    shadowRoot.appendChild(wrapperEl);

    // --- Add Styles & Scripts to Shadow Dom ---
    arrCss.forEach((css) => {
        const style = document.createElement('style');
        style.textContent = css;
        shadowRoot.appendChild(style);
    })

    const wrapperContainerEl = document.createElement('div');
    wrapperContainerEl.classList.add('SSwrapperContainer');
    wrapperEl.appendChild(wrapperContainerEl);

    const containerEl = document.createElement('div');
    containerEl.id = 'SScontainer'
    containerEl.classList.add('SScontainer');
    wrapperContainerEl.appendChild(containerEl);

    const navEl = document.createElement('nav');
    navEl.id = 'nav';
    navEl.classList.add('navbar');
    navEl.classList.add('navbar-expand-lg');
    navEl.classList.add('bg-body-tertiary');
    // navEl.classList.add('bg-primary');
    // navEl.classList.add('bg-dark');
    // This don't work for all elements normally. Must change all themes handily
    // navEl.setAttribute('data-bs-theme', 'dark');
    // like this
    // buttonEl.classList.add('btn-dark');
    // navLinkEl.classList.add('text-light');
    containerEl.appendChild(navEl);

    const containerFluidEl = document.createElement('div');
    containerFluidEl.classList.add('container-fluid');
    navEl.appendChild(containerFluidEl);

    const aLogoEl = document.createElement('a');
    aLogoEl.classList.add('SSbrandLogo');
    aLogoEl.classList.add('me-sm-2');
    aLogoEl.href = '#';
    aLogoEl.innerHTML = '⚡';
    containerFluidEl.appendChild(aLogoEl);

    const aLogoEl2 = document.createElement('a');
    aLogoEl2.classList.add('navbar-brand');
    aLogoEl2.href = '#';
    aLogoEl2.innerHTML = 'witcher';
    containerFluidEl.appendChild(aLogoEl2);

    const buttonLogoEl = document.createElement('button');
    buttonLogoEl.classList.add('navbar-toggler');
    buttonLogoEl.type = 'button';
    buttonLogoEl.setAttribute('data-bs-toggle', 'collapse');
    buttonLogoEl.setAttribute('data-bs-target', '#navbarColor04');
    buttonLogoEl.setAttribute('aria-controls', 'navbarColor04');
    buttonLogoEl.setAttribute('aria-expanded', 'false');
    buttonLogoEl.setAttribute('aria-label', 'Toggle navigation');
    containerFluidEl.appendChild(buttonLogoEl);

    const spanLogoEl = document.createElement('span');
    spanLogoEl.classList.add('navbar-toggler-icon');
    buttonLogoEl.appendChild(spanLogoEl);

    const navBarCollapseEl = document.createElement('div');
    navBarCollapseEl.id = 'navbarColor04';
    navBarCollapseEl.classList.add('collapse');
    navBarCollapseEl.classList.add('navbar-collapse');
    containerFluidEl.appendChild(navBarCollapseEl);

    const ulNavBarEl = document.createElement('ul');
    ulNavBarEl.classList.add('navbar-nav');
    ulNavBarEl.classList.add('me-auto');
    navBarCollapseEl.appendChild(ulNavBarEl);

    const liDropDownEl = document.createElement('li');
    liDropDownEl.classList.add('nav-item');
    liDropDownEl.classList.add('dropdown');
    ulNavBarEl.appendChild(liDropDownEl);

    const navLinkEl = document.createElement('a');
    navLinkEl.id = 'dropdown';
    navLinkEl.classList.add('nav-link');
    navLinkEl.classList.add('dropdown-toggle');
    navLinkEl.setAttribute('data-bs-toggle', 'dropdown');
    navLinkEl.setAttribute('role', 'button');
    navLinkEl.setAttribute('aria-haspopup', 'true');
    navLinkEl.setAttribute('aria-expanded', 'false');
    navLinkEl.innerHTML = 'Google';
    liDropDownEl.appendChild(navLinkEl);

    const img = document.createElement('img');
    img.src = googleLogo;
    img.classList.add('imgLogoEngine');
    navLinkEl.appendChild(img)

    const dropDownEl = document.createElement('div');
    dropDownEl.classList.add('dropdown-menu');
    liDropDownEl.appendChild(dropDownEl);


    const dropDownItemGoogleEl = document.createElement('a');
    dropDownItemGoogleEl.id = 'googleListItem';
    dropDownItemGoogleEl.classList.add('dropdown-item');
    dropDownItemGoogleEl.innerHTML = 'Google';
    dropDownEl.appendChild(dropDownItemGoogleEl);

    const imgGoogle = document.createElement('img');
    imgGoogle.src = googleLogo;
    imgGoogle.classList.add('imgLogoEngine');
    imgGoogle.classList.add('imgLogoEngine_listItem');
    dropDownItemGoogleEl.prepend(imgGoogle)

    const dropDownItemYandexEl = document.createElement('a');
    dropDownItemYandexEl.id = 'yandexListItem';
    dropDownItemYandexEl.classList.add('dropdown-item');
    dropDownItemYandexEl.innerHTML = 'Yandex';
    dropDownEl.appendChild(dropDownItemYandexEl);

    const imgYandex = document.createElement('img');
    imgYandex.src = yandexLogo;
    imgYandex.classList.add('imgLogoEngine');
    imgYandex.classList.add('imgLogoEngine_listItem');
    dropDownItemYandexEl.prepend(imgYandex)

    const dropDownItemBingEl = document.createElement('a');
    dropDownItemBingEl.id = 'yandexListItem';
    dropDownItemBingEl.classList.add('dropdown-item');
    dropDownItemBingEl.innerHTML = 'Bing';
    dropDownItemBingEl.classList.add('disabled');
    dropDownEl.appendChild(dropDownItemBingEl);

    const imgBing = document.createElement('img');
    imgBing.src = bingLogo;
    imgBing.classList.add('imgLogoEngine');
    imgBing.classList.add('imgLogoEngine_listItem');
    imgBing.classList.add('imgLogoEngine_disabled');
    dropDownItemBingEl.prepend(imgBing)

    const dropDownItemDuckEl = document.createElement('a');
    dropDownItemDuckEl.id = 'yandexListItem';
    dropDownItemDuckEl.classList.add('dropdown-item');
    dropDownItemDuckEl.innerHTML = 'DuckDuckGo';
    dropDownItemDuckEl.classList.add('disabled');
    dropDownEl.appendChild(dropDownItemDuckEl);

    const imgDuck = document.createElement('img');
    imgDuck.src = duckLogo;
    imgDuck.classList.add('imgLogoEngine');
    imgDuck.classList.add('imgLogoEngine_listItem');
    imgDuck.classList.add('imgLogoEngine_disabled');
    dropDownItemDuckEl.prepend(imgDuck)

    const dropDownItemBaiduEl = document.createElement('a');
    dropDownItemBaiduEl.id = 'yandexListItem';
    dropDownItemBaiduEl.classList.add('dropdown-item');
    dropDownItemBaiduEl.innerHTML = 'Baidu';
    dropDownItemBaiduEl.classList.add('disabled');
    dropDownEl.appendChild(dropDownItemBaiduEl);

    const imgBaidu = document.createElement('img');
    imgBaidu.src = baiduLogo;
    imgBaidu.classList.add('imgLogoEngine');
    imgBaidu.classList.add('imgLogoEngine_listItem');
    imgBaidu.classList.add('imgLogoEngine_disabled');
    dropDownItemBaiduEl.prepend(imgBaidu)

    const dropDownItemYahooEl = document.createElement('a');
    dropDownItemYahooEl.id = 'yandexListItem';
    dropDownItemYahooEl.classList.add('dropdown-item');
    dropDownItemYahooEl.innerHTML = 'Yahoo';
    dropDownItemYahooEl.classList.add('disabled');
    dropDownEl.appendChild(dropDownItemYahooEl);

    const imgYahoo = document.createElement('img');
    imgYahoo.src = yahooLogo;
    imgYahoo.classList.add('imgLogoEngine');
    imgYahoo.classList.add('imgLogoEngine_listItem');
    imgYahoo.classList.add('imgLogoEngine_disabled');
    dropDownItemYahooEl.prepend(imgYahoo)


    const dividerEl = document.createElement('div');
    dividerEl.classList.add('dropdown-divider');
    dropDownEl.appendChild(dividerEl);

    const dropDownItemSubscribeEl = document.createElement('a');
    dropDownItemSubscribeEl.id = 'subscribeListItem';
    dropDownItemSubscribeEl.classList.add('dropdown-item');
    dropDownItemSubscribeEl.href = '#';
    dropDownItemSubscribeEl.innerHTML = 'Subscribe 👑';
    dropDownEl.appendChild(dropDownItemSubscribeEl);

    const formEl = document.createElement('form');
    formEl.classList.add('d-flex');
    formEl.classList.add('w-100');
    navBarCollapseEl.appendChild(formEl);

    const inputEl = document.createElement('input');
    inputEl.id = searchInputId;
    inputEl.classList.add('form-control');
    inputEl.classList.add('me-sm-2');
    inputEl.setAttribute('type', 'search');
    inputEl.setAttribute('placeholder', 'Search..');
    formEl.appendChild(inputEl);

    const buttonEl = document.createElement('button');
    buttonEl.classList.add('btn');
    buttonEl.classList.add('btn-secondary');
    buttonEl.classList.add('my-2');
    buttonEl.classList.add('my-sm-0');
    buttonEl.setAttribute('type', 'submit');
    buttonEl.innerHTML = 'Search';
    formEl.appendChild(buttonEl);
}

// ----- Fetch -----

function prepareDate(data) {
    const preparedDate = [];

    data.items.forEach((item) => {
        preparedDate.push({
            title: item.title,
            htmlTitle: item.htmlTitle,
            formattedUrl: item.formattedUrl,
            link: item.link,
        })
    })

    return preparedDate;
}

function sendGoogleSearchQuery(query) {
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${customSearchEngineId}&q=${encodeURIComponent(query)}`;

    if (isDev) {
        const preparedData = prepareDate(mock);
        setList(preparedData)
    } else {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const preparedData = prepareDate(data);
                console.log('PreparedData for list');
                console.log(preparedData);
                console.log('');
                setList(preparedData)

            })
            .catch(error => {
                console.error('Error google search request:', error);
            });
    }
}

// ----- Utils -----

function checkScriptAccessibility() {
    if (typeof Popper !== 'undefined') {
        console.log('Popper.js is available');
    } else {
        console.log('Popper.js is not available');
    }

    if (typeof jQuery !== 'undefined') {
        console.log('jQuery is available');
    } else {
        console.log('jQuery is not available');
    }

    if (typeof bootstrap !== 'undefined') {
        console.log('Bootstrap.js is available');
    } else {
        console.log('Bootstrap.js is not available');
    }
}

function debounce(func, delay) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

function handleInput() {
    const inputElement = shadowRoot.getElementById(searchInputId);
    const inputValue = inputElement.value;
    inputElement.value ? sendGoogleSearchQuery(inputValue) : cleanList();
    console.log(`You typed: ${inputValue}`)
}

function storageChangeHandler(changes, areaName) {
    if (areaName === 'sync') {
        for (let key in changes) {
            const storageChange = changes[key];
            const keyValue = storageChange.newValue;

            if (keyValue === 'close' || keyValue === 'open') {
                sswitcherState = keyValue;
                changeSSwitcherState();
            }
            if (keyValue === 'google' || keyValue === 'yandex') {
                searchEngineState = keyValue;
                changeSearchEngineState(keyValue)
            }
            // console.log(`Key "${key}" was changed. New value: ${keyValue}`);
        }
    }
}

function changeSSwitcherState() {
    if (sswitcherState === 'close') {
        shadowHost.classList.add('displayNone')
    } else {
        shadowHost.classList.remove('displayNone')
    }
}

function changeSearchEngineState(seState) {
    const dropdown = shadowRoot.querySelector('#dropdown');

    switch(seState) {
        case 'google':
            dropdown.innerHTML = 'Google';
            break;
        case 'yandex':
            dropdown.innerHTML = 'Yandex';
            break;
        default:
            dropdown.innerHTML = 'Google';
    }

    setImgEngine(dropdown, seState);
}

function fetchScript(path) {
    return new Promise((resolve, reject) => {
        fetch(chrome.runtime.getURL(path))
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    reject(new Error(`Error: fetchScript loading ${path}`));
                }
            })
            .then(jsText => {
                resolve(jsText); // Возвращаем исходный текст JS файла
            })
            .catch(error => {
                reject(error);
            });
    });
}

// ----- Dom manipulate -----

function setImgEngine(dropdown, searchEngine) {
    const img = document.createElement('img');

    switch(searchEngine) {
        case 'google':
            img.src = googleLogo;
            break;
        case 'yandex':
            img.src = yandexLogo;
            break;
        default:
            img.src = googleLogo;
    }

    img.classList.add('imgLogoEngine');
    dropdown.appendChild(img)
}

function setList(data) {
    const nav = shadowRoot.querySelector('#SScontainer')
    let listGroup = shadowRoot.querySelector('#list-group')

    if (listGroup) {
        listGroup.innerHTML = '';
    } else {
        listGroup = document.createElement('div');
        listGroup.id = 'list-group';
        listGroup.classList.add('list-group');
        nav.appendChild(listGroup);
    }

    data.forEach((item) => {
        const listItemEl = document.createElement('a');
        listItemEl.href = `https://www.google.com/search?q=${item.title}`;
        listItemEl.classList.add('list-group-item');
        listItemEl.classList.add('list-group-item-action');
        listItemEl.innerHTML = item.htmlTitle;

        listItemEl.addEventListener('mouseenter', () => {
            listItemEl.classList.add('active');
        });

        listItemEl.addEventListener('mouseleave', () => {
            listItemEl.classList.remove('active');
        });

        listGroup.appendChild(listItemEl);
    });
}

function cleanList() {
    let listGroup = shadowRoot.querySelector('#list-group')
    if (listGroup) {
        listGroup.innerHTML = '';
    }
}

// ----- Listeners -----

function initListeners() {
    initToggle()
    initDropDown()
    initSearchListener()
    initSwitcherVisibility()
    initSearchEngine()
}

function initToggle() {
    const burgerButton = shadowRoot.querySelector('.navbar-toggler');
    const navBarCollapse = shadowRoot.querySelector('.navbar-collapse');

    burgerButton.addEventListener('click', () => {
        navBarCollapse.classList.toggle('show');
    });

    const dropdownToggle = shadowRoot.querySelectorAll('.dropdown-toggle');

    dropdownToggle.forEach((toggle) => {
        toggle.addEventListener('click', (e) => {
            const dropdownMenu = e.target.nextElementSibling;
            dropdownMenu.classList.toggle('show');
        });
    });
}

function initDropDown() {
    const google = shadowRoot.querySelector('#googleListItem');
    const yandex = shadowRoot.querySelector('#yandexListItem');

    google.addEventListener('click', () => {
        setStorageItem(searchEngineKey, 'google');
    });

    yandex.addEventListener('click', () => {
        setStorageItem(searchEngineKey, 'yandex');
    });

    utils.getStorageItem(searchEngineKey, (seState) => {
        changeSearchEngineState(seState)
    })
}

function initSearchListener() {
    const inputElement = shadowRoot.getElementById(searchInputId);
    handleInput();
    inputElement.addEventListener('input', debounce(handleInput, DEBOUNCE_TIME));
}

function initSwitcherVisibility() {
    utils.getStorageItem(sswitcherKey, (ssState) => {
        if (ssState === 'open' || ssState === 'close') {
            sswitcherState = ssState
        }
        changeSSwitcherState();
    })

    chrome.storage.onChanged.addListener(storageChangeHandler);
}

function initSearchEngine() {
    utils.getStorageItem('sswitcher', (seState) => {
        if (seState === 'open' || seState === 'close') {
            searchEngineState = seState
        }
        if (seState === 'google' || seState === 'yandex') {
            searchEngineState = seState
            changeSearchEngineState(seState);
        }
    })

    chrome.storage.onChanged.addListener(storageChangeHandler);
}

const mock =
    {
        "searchInformation": {
            "totalResults": "778000000",
            "formattedTotalResults": "778,000,000"
        },
        "items": [
            {
                "title": "The Official Woody Guthrie Website",
                "htmlTitle": "The Official <b>Woody</b> Guthrie Website",
                "link": "https://www.woodyguthrie.org/",
            },
            {
                "title": "WOODY'S PHILADELPHIA : PHILLY'S LANDMARK LGBTQ ...",
                "htmlTitle": "<b>WOODY&#39;S</b> PHILADELPHIA : PHILLY&#39;S LANDMARK LGBTQ ...",
                "link": "https://woodysbar.com/",
            },
            {
                "title": "Woody Guthrie Center - Tulsa, OK",
                "htmlTitle": "<b>Woody</b> Guthrie Center - Tulsa, OK",
                "link": "https://woodyguthriecenter.org/",
            },
            {
                "title": "Woody's Sports Tavern & Grill",
                "htmlTitle": "<b>Woody&#39;s</b> Sports Tavern &amp; Grill",
                "link": "https://www.woodysportstavern.com/",
            },
            {
                "title": "Woody Creek Distillers: WCD Home Page",
                "htmlTitle": "<b>Woody</b> Creek Distillers: WCD Home Page",
                "link": "https://woodycreekdistillers.com/",
            },
            {
                "title": "Woody Allen - Wikipedia",
                "htmlTitle": "<b>Woody</b> Allen - Wikipedia",
                "link": "https://en.wikipedia.org/wiki/Woody_Allen",
            },
            {
                "title": "Woody's Wood Fired Pizza",
                "htmlTitle": "<b>Woody&#39;s</b> Wood Fired Pizza",
                "link": "http://www.woodysgolden.com/",
            },
            {
                "title": "Woody (@woodyonthemoon) • Instagram photos and videos",
                "htmlTitle": "<b>Woody</b> (@woodyonthemoon) • Instagram photos and videos",
                "link": "https://www.instagram.com/woodyonthemoon/?hl=en",
            },
            {
                "title": "Woody (Toy Story) - Wikipedia",
                "htmlTitle": "<b>Woody</b> (Toy Story) - Wikipedia",
                "link": "https://en.wikipedia.org/wiki/Woody_(Toy_Story)",
            },
            {
                "title": "Sheriff Woody | Characters | Toy Story",
                "htmlTitle": "Sheriff <b>Woody</b> | Characters | Toy Story",
                "link": "https://toystory.disney.com/sheriff-woody",
            }
        ]
    }