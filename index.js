// import Router from 'vanilla-router'
import Router from "./router/routers";
import Route from "./router/route";
import component1 from "./components/component1";
import component2 from "./components/component2";
import "./index.scss";
import "./common-components";

function init() {
  // initiating a callback empty object to be used by component to interect to its html file
  window.callbacks = {};

  // initiating a router and providing routes for them
  new Router([
    new Route("component1", component1, true),
    new Route("component2", component2),
  ]);
}
init();
