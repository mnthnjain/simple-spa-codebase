export default function Router(routes) {
  try {
    if (!routes) {
      throw "error: routes param is mandatory";
    }
    this.constructor(routes);
    this.init();
  } catch (e) {
    console.error(e);
  }
}

Router.prototype = {
  routes: undefined,
  rootElem: undefined,
  constructor: function (routes) {
    this.routes = routes;
    this.rootElem = document.getElementById("app");
  },
  init: function () {
    var r = this.routes;
    (function (scope, r) {
      window.addEventListener("hashchange", function (e) {
        scope.hasChanged(scope, r);
      });
    })(this, r);
    this.hasChanged(this, r);
  },
  hasChanged: function (scope, r) {
    if (window.location.hash.length > 0) {
      for (var i = 0, length = r.length; i < length; i++) {
        var route = r[i];
        if (route.isActiveRoute(window.location.hash.substr(1))) {
          scope.goToRoute(route);
        }
      }
    } else {
      for (var i = 0, length = r.length; i < length; i++) {
        var route = r[i];
        if (route.default) {
          scope.goToRoute(route);
        }
      }
    }
  },
  goToRoute: function (route) {
    (function (scope) {
      if (window.onComponentUnload) {
        window.onComponentUnload();
        delete window.onComponentUnload;
      }
      scope.rootElem.innerHTML = route.component(route);
      if (window.onComponentLoad) {
        window.onComponentLoad();
        delete window.onComponentLoad;
      }
    })(this);
  },
};
