## TODO

- when enter button by list in search, open in iframe result or redirect
- add blocked search engines
- [draggable](https://interactjs.io/)
- change theme
- add button exit right side for close search component
- backend for auth and subscribe services (get more search engine) 
- detect browser theme
- linter, prettier.
- i18n.
- create env file.
- theming.
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

## Issues

- fix click search engine logo icon in dropdown is preventing of click

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

- [Angular scope](https://code.angularjs.org/1.2.27/docs/guide/scope)
- [bootswatch](https://bootswatch.com/)
- example of chrome [extension](https://github.com/Barklim/onlyfExtension/tree/main/Chrome_Extension/js/app) (private)