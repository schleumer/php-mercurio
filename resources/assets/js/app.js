// <editor-fold desc=" -- [spoiler]Gambiarra[/spoiler]">
require('./config/jquery');
// </editor-fold>

var angular = require("angular")
  , angularRoute = require("angular-route")
  , angularResource = require("angular-resource")
  , angularStorage = require("ngstorage")
  // VONTADE DE MATAR UM
  , angularTable = require("ng-table/dist/ng-table.js")
  , S = require("string")
  , R = require("ramda")
  , $ = require("jquery")
  , moment = require("moment");

var resources = require("./resources")
  , factories = require("./factories")
  , services = require("./services")
  , directives = require("./directives")
  , routes = require("./routes")
  , helpers = require("./helpers")
  , boot = require("./config/boot")
  , assets = require("./assets")
  , { routePrefix } = require('./config');

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

var app = angular.module('Horae', ['ngRoute', 'ngResource', 'ngStorage', 'ngTable']);

var validDirectiveName = (name) => {
  return `app${S(name).titleCase().s}`
};

// TODO: Deixar mais bonito e menos estranho e mais automatico, porque as pessoas gostam de coisas automaticas

R.mapObjIndexed((resolver, name) => {
  app.directive(validDirectiveName(name), resolver)
}, directives);

R.mapObjIndexed((resolver, name) => {
  app.service(S(name).titleCase().s, resolver)
}, services);

R.mapObjIndexed((resolver, name) => {
  app.factory(S(name).titleCase().s, resolver);
}, factories);

R.mapObjIndexed((resolver, name) => {
  app.factory(S(name).titleCase().s, resolver);
}, resources);

app
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

app.filter("money", function() {
  return function(input, decimal) {
    // o desenvolvedor da jquery-mask-plugin é um fanfarrão
    input = parseFloat(input).toFixed(2);
    return "R$ " + $(`<span>${input}</span>`).mask("#.##0,00", {reverse: true}).text();
  }
});

app.filter("maskDateTime", function() {
  return function(input) {
    return moment(input).format("L LTS");

  }
});


app.run(boot);