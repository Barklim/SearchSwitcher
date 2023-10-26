console.log('content script ran');

// ----- Config -----

const themeMode = 'minty'
const themeLight = 'light'
const DEBOUNCE_TIME = 300;
const searchInputId = 'SSsearch';
const sourceCssLinks = ["css/darkly-bootswatch.css", "css/searchInput.css"];

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
    // TODO get theme
    console.log('Content.js Loaded');

    const scriptCssPromises = sourceCssLinks.map(sourceLink => fetchScript(sourceLink));
    let arrCssContentText = [];
    const cssPromise = Promise.all(scriptCssPromises);

    Promise.all([cssPromise])
        .then(([cssScriptTexts]) => {
            console.log("All CSS Scripts successfully loaded:");
            cssScriptTexts.forEach((scriptText, index) => {
                console.log(`Script ${sourceCssLinks[index]}:\n`);
                arrCssContentText.push(scriptText);
            });

            createInput(arrCssContentText);

            initBootstrapJs()

            initSearchListener()

        })
        .catch(error => {
            console.error("Error load scripts:", error);
        });

    // getStorageItem('theme', function (interrupted) {
    //     if (theme) {}
    // });
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
    containerEl.classList.add('SScontainer');
    wrapperContainerEl.appendChild(containerEl);

    // <nav class="navbar navbar-expand-lg bg-body-tertiary">
    const navEl = document.createElement('nav');
    navEl.id = 'nav'; // id
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

    // <div class="container-fluid">
    const containerFluidEl = document.createElement('div');
    containerFluidEl.classList.add('container-fluid');
    navEl.appendChild(containerFluidEl);

    // <a class="navbar-brand" href="#">Navbar</a>
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

    // <button class="navbar-toggler" type="button"
    //      data-bs-toggle="collapse"
    //      data-bs-target="#navbarColor04"
    //      aria-controls="navbarColor04"
    //      aria-expanded="false"
    //      aria-label="Toggle navigation">
    //   <span class="navbar-toggler-icon"></span> </button>
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

    // <div className="collapse navbar-collapse" id="navbarColor04">
    const navBarCollapseEl = document.createElement('div');
    navBarCollapseEl.id = 'navbarColor04';
    navBarCollapseEl.classList.add('collapse');
    navBarCollapseEl.classList.add('navbar-collapse');
    containerFluidEl.appendChild(navBarCollapseEl);

    // <ul class="navbar-nav me-auto">
    const ulNavBarEl = document.createElement('ul');
    ulNavBarEl.classList.add('navbar-nav');
    ulNavBarEl.classList.add('me-auto');
    navBarCollapseEl.appendChild(ulNavBarEl);

    // <li class="nav-item dropdown">
    const liDropDownEl = document.createElement('li');
    liDropDownEl.classList.add('nav-item');
    liDropDownEl.classList.add('dropdown');
    ulNavBarEl.appendChild(liDropDownEl);

    // <a class="nav-link dropdown-toggle"
    //      data-bs-toggle="dropdown"
    //      href="#" role="button"
    //      aria-haspopup="true"
    //      aria-expanded="false">Dropdown</a>
    const navLinkEl = document.createElement('a');
    navLinkEl.classList.add('nav-link');
    navLinkEl.classList.add('dropdown-toggle');
    navLinkEl.setAttribute('data-bs-toggle', 'dropdown');
    navLinkEl.href = '#';
    navLinkEl.setAttribute('role', 'button');
    navLinkEl.setAttribute('aria-haspopup', 'true');
    navLinkEl.setAttribute('aria-expanded', 'false');
    navLinkEl.innerHTML = 'Google';
    liDropDownEl.appendChild(navLinkEl);

    // <div class="dropdown-menu">
    const dropDownEl = document.createElement('div');
    dropDownEl.classList.add('dropdown-menu');
    liDropDownEl.appendChild(dropDownEl);

    // <a class="dropdown-item" href="#">Action</a>
    const dropDownItemGoogleEl = document.createElement('a');
    dropDownItemGoogleEl.id = 'googleListItem';
    dropDownItemGoogleEl.classList.add('dropdown-item');
    dropDownItemGoogleEl.href = '#';
    dropDownItemGoogleEl.innerHTML = 'G(icon) Google';
    dropDownEl.appendChild(dropDownItemGoogleEl);

    const dropDownItemYandexEl = document.createElement('a');
    dropDownItemYandexEl.id = 'yandexListItem';
    dropDownItemYandexEl.classList.add('dropdown-item');
    dropDownItemYandexEl.href = '#';
    dropDownItemYandexEl.innerHTML = 'Y(icon) Yandex';
    dropDownEl.appendChild(dropDownItemYandexEl);

    // <div class="dropdown-divider"></div>
    const dividerEl = document.createElement('div');
    dividerEl.classList.add('dropdown-divider');
    dropDownEl.appendChild(dividerEl);

    const dropDownItemSubscribeEl = document.createElement('a');
    dropDownItemSubscribeEl.id = 'subscribeListItem';
    dropDownItemSubscribeEl.classList.add('dropdown-item');
    dropDownItemSubscribeEl.href = '#';
    dropDownItemSubscribeEl.innerHTML = 'Subscribe 👑';
    dropDownEl.appendChild(dropDownItemSubscribeEl);

    // <form class="d-flex">
    const formEl = document.createElement('form');
    formEl.classList.add('d-flex');
    formEl.classList.add('w-100');
    navBarCollapseEl.appendChild(formEl);

    // <input className="form-control me-sm-2" type="search" placeholder="Search">
    const inputEl = document.createElement('input');
    inputEl.id = searchInputId;
    inputEl.classList.add('form-control');
    inputEl.classList.add('me-sm-2');
    inputEl.setAttribute('type', 'search');
    inputEl.setAttribute('placeholder', 'Search..');
    formEl.appendChild(inputEl);

    // <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
    const buttonEl = document.createElement('button');
    buttonEl.classList.add('btn');
    buttonEl.classList.add('btn-secondary');
    buttonEl.classList.add('my-2');
    buttonEl.classList.add('my-sm-0');
    buttonEl.setAttribute('type', 'submit');
    buttonEl.innerHTML = 'Search';
    formEl.appendChild(buttonEl);
}

// ----- Utils -----

// Use background.js instead?
function setStorageItem(varName, data) {}

function getStorageItem(varName, callback) {}

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

function initBootstrapJs() {
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

function debounce(func, delay) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

function initSearchListener() {
    const inputElement = shadowRoot.getElementById(searchInputId);
    handleInput();
    inputElement.addEventListener('input', debounce(handleInput, DEBOUNCE_TIME));
}

function handleInput() {
    const inputElement = shadowRoot.getElementById(searchInputId);
    const inputValue = inputElement.value;
    console.log(`You typed: ${inputValue}`)
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