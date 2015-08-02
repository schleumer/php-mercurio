var { use, routes } = require("./helpers/index.js");
var C = require("./controllers/index.js");

var { freeRoute, route, meta } = routes;
var i18n = $i18n('routes');

// As rotas não estão em um objeto porque objetos (podem) não ser ordenados
module.exports = [
  route(C.home, '/', require('templates/index.html'), 'HomeController',
    meta('home', i18n.all('home', 'home-desc'))),

  route(C.customers, '/customers', require('templates/customers/index.html'), 'CustomersController',
    meta('accounts', i18n.all('customers', 'customers-desc'))),

  route(C.jobs, '/jobs', require('templates/jobs/index.html'), 'JobsController',
    meta('case', i18n.all('jobs', 'jobs-desc'))),

  route(C.jobOrders, '/job-orders', require('templates/job-orders/index.html'), 'JobOrdersController',
    meta('label', i18n.all('job-orders', 'job-orders-desc'))),

  route(C.payables, '/payables', require('templates/payables/index.html'), 'PayablesController',
    meta('forward', i18n.all('payables', 'payables-desc'))),

  route(C.receivables, '/receivables', require('templates/receivables/index.html'), 'ReceivablesController',
    meta('backward', i18n.all('receivables', 'receivables-desc'))),

  freeRoute(C.auth, '/auth', require('templates/auth.html'), 'AuthController')
];