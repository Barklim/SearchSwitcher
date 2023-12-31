## TODO

- setFocusTo input when open extension
- delete bootsrap.css from dom.
- show search results (data.searchInformationf)
- add settings for show htmlSnippet & another
- when redirected hide search component
- add hotKeys crib, open search input when use hot keys combo (f9). Escape for close
- [draggable](https://interactjs.io/)
- add button exit right side for close search component
- backend for auth and subscribe services (get more search engine)
- linter, prettier.
- i18n.
- create env file.
- theming.
- change theme
- detect browser theme
- yandex metrics.
- sass, less?
- mobile layouting have sense?
- draggable jquery template.
- puppeteer testing extension.
- backend for subscription (which unblock some sEngines).
- validation inputs.
- content util getCurrentTab. (Solve: pass the id off tab in a listener)
- check web_accessible_resources in manifest.

## Done

- ✅ shadow dom search component for isolate styles.
- ✅ click icon extension close or open search component in any tabs.
- ✅ search debounce.
- ✅ when switching to different tabs, the correct search engine should open.
- ✅ add blocked search engines

## Issues

- fix click search engine logo icon in dropdown is preventing of click
- fix case of redirect, when input is empty and user keydown enter button.
- when enter button by list in search, open in iframe result or redirect?

------

## Notes

If you forward messages with the text css to each tab,
then you will also need to forward it to new opening tabs using the onCreated method
sendMessage(?) or use (chrome.scripting.executeScript && chrome.scripting.registerContentScripts)
script.onload dont give text of script.
can realize loader.js put text of scripts in some variables in window

no success when take all computed styles from dom
document.querySelectorAll('style') document.styleSheets
```
fetch(chrome.runtime.getURL('../../css/darkly-bootswatch.css'))
.then(response => response.text())
.then(css => {
})
.catch(error => console.error(error));
```

## Useful Links

- [Google Console](https://console.cloud.google.com/apis/credentials/key/b99fb10b-8116-45c8-ab8b-775f3aa12b8f?authuser=0&project=sswitcher)
    - [Custom Search](https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list?apix=true&hl=ru)
    - Custom search [docs](https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list?hl=ru&apix_params=%7B%22q%22%3A%22woody%22%7D)
    - Custom search docs useing [rest](https://developers.google.com/custom-search/v1/using_rest?hl=ru)
    - Search [engine](https://programmablesearchengine.google.com/controlpanel/create/congrats?cx=e79bb8ff5338048ae)
- [Angular scope](https://code.angularjs.org/1.2.27/docs/guide/scope)
- [bootswatch](https://bootswatch.com/)
- example of chrome [extension](https://github.com/Barklim/onlyfExtension/tree/main/Chrome_Extension/js/app) (private)


Minty Morph
//
search engine
yahooo bing yandex google DuckDuckGo
https://www.google.com/imgres?imgurl=https%3A%2F%2Fmir-s3-cdn-cf.behance.net%2Fproject_modules%2F1400%2Ff215fd105733919.5f7f6834a887b.png&tbnid=53FURgH_Z_vUMM&vet=10CB4QMyh1ahcKEwjYpZOkx5CCAxUAAAAAHQAAAAAQAw..i&imgrefurl=https%3A%2F%2Fwww.behance.net%2Fgallery%2F105733919%2FYANDEX&docid=Pa594_qNZQTexM&w=1400&h=651&q=google%20yandex%20search%20icon&ved=0CB4QMyh1ahcKEwjYpZOkx5CCAxUAAAAAHQAAAAAQAw

https://www.flaticon.com/ru/search?word=yahoo
https://www.iconfinder.com/search?q=search+engine
https://www.iconfinder.com/search/icons?family=free-button-icons
https://www.google.com/search?q=google+yandex+bing+yahoo+duckduckgo&tbm=isch&ved=2ahUKEwjotcijx5CCAxXK2zgGHYheCeAQ2-cCegQIABAA&oq=google+yandex+bing+yahoo+duckduckgo&gs_lcp=CgNpbWcQAzoECCMQJzoGCAAQCBAeUIsiWL9tYMpvaAJwAHgBgAFuiAGhDpIBBDIzLjGYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=urM4ZejwJMq34-EPiL2lgA4&bih=879&biw=1920#imgrc=E6LiMxt5fueVDM

https://www.google.com/search?q=google+yandex+bing+yahoo+duckduckgo&tbm=isch&ved=2ahUKEwjotcijx5CCAxXK2zgGHYheCeAQ2-cCegQIABAA&oq=google+yandex+bing+yahoo+duckduckgo&gs_lcp=CgNpbWcQAzoECCMQJzoGCAAQCBAeUIsiWL9tYMpvaAJwAHgBgAFuiAGhDpIBBDIzLjGYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=urM4ZejwJMq34-EPiL2lgA4&bih=879&biw=1920#imgrc=gMP2JhDXgh7lLM