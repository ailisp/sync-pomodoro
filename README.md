# Write React Native like apprun, elm, imba or re-frame

React is considerably more lengthy, less performant and state management is painful compare to apprun, elm, imba or re-frame. If you have used any of them, you know what I'm saying. If you haven't, take a look at https://medium.com/dailyjs/a-realworld-comparison-of-front-end-frameworks-2020-4e50655fe4c1 to see how much performance increase and less code it takes in apprun and re-frame. It will take more code than imba, but the advantage is it's still JavaScript. In general it'll save 50% of the code compare to react-redux and more for vanilla react with hooks.
However you have to use react for some project and for the sake of React Native, which are best of the type in sharing most of the base of logic and many of the UI with a Web App, a Mobile App and a Desktop App (with https://react.nodegui.org/ or https://microsoft.github.io/react-native-windows/). Then this template is for you. It gives you comparable performance in web vs apprun and even shorter lines of code vs apprun.

## Advantage

- It's a react native template, and work out of box for both mobile app and web. You can specify different view for mobile and for web (see `Page1.js` and `Page1.native.js` as example, or reuse the logic and view. Desktop app build support is WIP.
- Global state, state is accessible in browser console, and app status is fully determined by set the same state with `setState`, include routing
- Routing does correct behavior in both web and mobile. In web, it does correct thing on refresh
- Global dispatch event with `d`
- Use every component with memo, so that every component won't re-render if state is same as the previous one
- Every component is fully depend on the props pass to it, no local state, very easy to test them. Props passed to components are partial of the global state
- You can reproduce the app state or go back to a historical state just by setting `setState`. This is a superior advantage in debug and e2e test.
- State is `Map` and `List` from immutable.js, you can easilly update or access a nested prop with `setIn` and `getIn`

## Usage

```
npm i
npm start
# enters expo console
w # open web, with auto refresh
a # open android simulator
r # refresh android app
# or scan the qr code printed in console to run app on your iOS and Android device
```

- Set initial state in `store.js`
- To add a new page or component: goto `pages/` and `components/` and add. Every component is purely functionaly, only takes props and should be wrap with `memo`. If it need state, pass state as prop. It is not recommended to have any local state component but it's possible to do.
- To add a new event, add or import in `events/index.js`. Function name is event name. Event function should take one object as event argument. Event can dispatch other event and should the new state. To change one part of state and keeping th rest, use immutable.js `setIn`.
- To dispatch a event, use `d('eventName', {eventArg1: '...', eventArg2: '...'})`
- To use router, use `d('goPath', {path: '/some/path'})`
- To debug and reproduce app ui in browser, get and change state in browser console with `state` and `setState`. It will fully reproduce the UI given the state as long as you don't have any local state component.

## Getting the most benefit from this template

This template structure assume you have experience in using one of apprun, elm, imba or re-frame and have basic knowledge of react-native. In case you're not, it's recommended to follow one of this tutorial:

- apprun: https://apprun.js.org/docs/
- imba: https://imba.io/language/introduction
- elm: https://guide.elm-lang.org/
- re-frame: https://day8.github.io/re-frame/re-frame/

Of this apprun is most recommended since it's in JavaScript and quickest to learn.
Besides these, it's recommended to know a little of immutable.js, only this section should be sufficient: https://github.com/immutable-js/immutable-js#nested-structures. So you should always pass the required subset of state to pages and components, no more. Every component should be wrap with a `memo` since functional state comparison is fast, this would reduce all necessary render.

Then if you haven't used react native before, you just need to know this very little to use react-native:

- If you don't need mobile app part at all, you just write exactly same react code.
- If you need mobile app, you have a few choices:
  - only use react-native components, they can be rendered both on web and on mobile. The cons is you cannot use html elements, css but only react native stylesheets.
  - create differnt version for component that look different on web and on mobile, example like `Page1.js`, `Page1.native.js` and also `components/ViewComponent`. When run and build it just automatically pick the right one for you. This is good if you want to reuse a lot of components and all of the logic, but want the web version looks like a professional web page and mobile version looks like a professional app. Note all html elements cannot be used in mobile.
  - In any javascript file you want to check if it's run as mobile app or as web page, use `Platform.OS`, you can see it in some places in this template
