var angular = require("angular")
  , angularRoute = require("angular-route")
  , angularResource = require("angular-resource")
  , angularStorage = require("ngstorage")
  , R = require("ramda");

var resources = require("./resources")
  , factories = require("./factories")
  , directives = require("./directives")
  , routes = require("./routes")
  , helpers = require("./helpers");

var { use } = helpers;

// <editor-fold desc=" -- [spoiler]Gambiarra[/spoiler]">
document
  .getElementById("app")
  .style
  .display = "block";

document
  .getElementById("anti-flickering-loading")
  .style
  .display = "none";
// implicando que o JS seja o ultimo arquivo a carregar
// </editor-fold>

var app = angular.module('Horae', ['ngRoute', 'ngResource', 'ngStorage']);

var routePrefix = '#';


// TODO: Deixar mais bonito e menos estranho
app
  .directive('appLeftNav', directives.leftNav)
  .directive('appLoading', directives.loading)
  .directive('appText', directives.text)
  .directive('appError', directives.error)
  .directive('appErrorBlock', directives.errorBlock)
  .directive('appForm', directives.form)
  .factory('Users', resources.users)
  .factory('Auth', factories.auth)
  .factory('Chaos', factories.chaos)
  .factory('Loading', factories.loading)
  // EWWWWWWWWWWWW
  /* @ngAnnotate */
  .config(function routeConfig($routeProvider) {
    R.forEach(
      R.pipe(
        R.pick(['path', 'template', 'name', 'free', 'resolver']),
        (route) => $routeProvider.when(route.path, use(route))
      ), routes);

    $routeProvider.otherwise('/');
  });



R.forEach(
  R.pipe(
    R.pick(['name', 'resolver']),
    R.values,
    R.apply(app.controller)
  ), routes);


/* @ngInject */
app.run(function run($rootScope, Auth) {
  $rootScope.appLoadingClass = "app-loading";
  $rootScope.routes = routes;
  $rootScope.str = $i18n('templates').get;

  $rootScope.getLeftNavClass = () => {
    return Auth.isAuthenticated() ? 'col-xs-3' : 'hidden';
  };

  $rootScope.getContainerClass = () => {
    return Auth.isAuthenticated() ? 'col-xs-9' : 'col-xs-12';
  };

  $rootScope.getAppBarNavClass = () => {
    return Auth.isAuthenticated() || 'ayyyy';
  };

  $rootScope.isUserPresent = () => {
    return Auth.isAuthenticated();
  };

  $rootScope.isNavigable = (item) => {
    return !!item.meta;
  };

  $rootScope.buildUrlFromPath = (path) => {
    return routePrefix + path;
  };
});