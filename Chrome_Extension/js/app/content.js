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

    createInput()

    // getStorageItem('theme', function (interrupted) {
    //     if (theme) {}
    // });
});

// ----- Utils -----

// Use background.js instead?
function setStorageItem(varName, data) {}

function getStorageItem(varName, callback) {}

// ----- Create html -----

function createInput() {
    const body = document.getElementsByTagName('body')[0];

    const wrapperEl = document.createElement('div');
    wrapperEl.classList.add('SSwrapperContent');
    body.appendChild(wrapperEl);

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
    containerEl.appendChild(navEl);

    // <div class="container-fluid">
    const containerFluidEl = document.createElement('div');
    containerFluidEl.classList.add('container-fluid');
    navEl.appendChild(containerFluidEl);

    // <a class="navbar-brand" href="#">Navbar</a>
    const aLogoEl = document.createElement('a');
    aLogoEl.classList.add('navbar-brand');
    aLogoEl.href = '#';
    aLogoEl.innerHTML = '🇸witcher';
    containerFluidEl.appendChild(aLogoEl);

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
    // dropDownEl.classList.add('show');
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