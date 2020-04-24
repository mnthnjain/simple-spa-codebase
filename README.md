# simple-spa-codebase
Simple codebase to create your own SPA without heavy framework like Angular, React etc, instead using simple vanilla js and webpack to build it to one js file

Before Reading further please checkout this demo url to know why and when to use this type of approach for your website

**DEMO** [SIMPLE-SPA-CODEBASE](https://mnthnjain.github.io/simple-spa-codebase/)

## Comparison
Big players like the Angular, React.js or Vue.js minimum final bundle size is of more than 130kb containing nothing.
This webpage you are looking at is of just 9kb final bundle size(bundle.js). which leaves no comparison on that end


## When to use this codebase
If you are building a website for simple usecase like showing simple html pages, or like websites to show some forms for getting users informations, etc.
basically where you are developing simple websites which needs to be SPA(Single Page Application) supporting CSR(Client Side Rendering) but Shadow rendering(virtual dom) or complex data flow is not required


## Installation
Clone this Repo then

Use the package manager [npm](https://www.npmjs.com/) to install dependencies.
Go the the root folder of this repo and use this command

```bash
npm install
```

## Run Locally
Run this command on root folder of the projects
```bash
npm start
```
This will run a webpack-development server on port 8080


## Build
Run this command on root folder of the project
```bash
npm run build
```
this will create a production ready optimised build in the /dist folder of the project

# How to use, Project Detail 
Following are the some description on how to use this codebase

## webpack config
Checkout the webpack.config.js file and see the entry and output field in exports

```js
entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
```

entry tell from where to start reading the js code and 

output tells in which folder we need to deliver the final build

## Application flow
Webpack is being used to build one final bundle.js files which is containing all the js code, css and html altogether for that I have configured webpack.config.js file to start reading executing code from index.js file

as index.js files import all the other files
```js
import Router from "./router/routers";
import Route from "./router/route";
import component1 from "./components/component1";
import component2 from "./components/component2";
import "./index.scss";
import "./common-components";
```

as the code of all the components, css are imported, they also will get bundled up in the final build

## understanding router
In the root index.js the  main init function is 

```js
function init() {
  // initiating a callback empty object to be used by component to interect to its html file
  window.callbacks = {};

  // initiating a router and providing routes for them
  new Router([
    new Route("component1", component1, true),
    new Route("component2", component2),
  ]);
}
```
We have created our own hash based router(checkout router/router.js) file and here we are initiating its instance and defining 2 routes on which two different components will be rendered 

basically what our router is doing is changing the content of 
```html
<div id="app"></div>
```

in out root html file(basically how webframeworks works)

## Understanding Components
Every components is basically a function which is returning some html file and including the css(scss) for it

### javascript

```js
import "./component1.scss";
import template from "./component1.html";
export default function component2() {
  window.onComponentLoad = () => {
    console.log("welcome, your component2 loaded");
  };

  return template;
}
```

there are two lifecycle method for anycomponent 

```js
window.onComponentLoad
window.onComponentUnload
```
which is upto user to defined or not, 

basically user can define their side effects in ```window.onComponentLoad ```methods(where user need to update the html document on some interaction)

in ```window.onComponentUnload``` method user can remove all the callback associated to the pages(timer, subscription, etc...)

### Template HTML
here is look at a simple component
```html
<div class="container component1">
    you are looking at component 1
<div>
```

basically we are defining a container and adding the component1 class for applying the styles into it 

### Style-SCSS
in scss file we are defining the class and call add css related to component1 into it 
```scss
.component1 {
  // add you component2 specific scss here
}

```

## Understanding Common Components
There are chances that you will have some common component used at multiple places(either simple styled component or with some complex js functionality)
we are handling that use case with customElementsAPI of browser

checkout common-components/header

```js

class Header extends HTMLElement {
  constructor(props) {
    super();
    this.innerHTML = template;
    window.callbacks.header = {
      navigateToComponent1,
      navigateToComponent2,
    };
  }
}
customElements.define("app-header", Header);

```

we are defining a customElement that can be used like 
```html
<app-header></app-header>
```
checkout component1 and component2 html file where 

```<app-header><app-header>```
 is called on first line

 you can pass props(arguments) also to these components and use them in even better way checkout [MDN customElements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
