var { use, routes } = require("./helpers/index.js");
var C = require("./controllers");

var { freeRoute, route, meta } = routes;
var i18n = $i18n('routes');

// As rotas não estão em um objeto porque objetos (podem) não ser ordenados
module.exports = [
  route(C.home, '/', require('templates/index.html'), 'HomeController',
    meta('home', i18n.all('home', 'home-desc'))),

  route(C.customers, '/customers', require('templates/customers/index.html'), 'CustomersController',
    meta('accounts', i18n.all('customers', 'customers-desc'))),
  route(C.customers, '/customers/new', require('templates/customers/form.html'), 'CustomersController'),
  route(C.customers, '/customers/edit/:id', require('templates/customers/form.html'), 'CustomersController'),

  route(C.jobs, '/jobs', require('templates/jobs/index.html'), 'JobsController',
    meta('case', i18n.all('jobs', 'jobs-desc'))),
  route(C.jobs, '/jobs/new', require('templates/jobs/form.html'), 'JobsController'),
  route(C.jobs, '/jobs/edit/:id', require('templates/jobs/form.html'), 'JobsController'),

  route(C.jobOrders, '/job-orders', require('templates/jobOrders/index.html'), 'JobOrdersController',
    meta('label', i18n.all('job-orders', 'job-orders-desc'))),
  route(C.jobOrders, '/job-orders/new', require('templates/jobOrders/form.html'), 'JobOrdersController'),
  route(C.jobOrders, '/job-orders/edit/:id', require('templates/jobOrders/form.html'), 'JobOrdersController'),

  route(C.payables, '/payables', require('templates/payables/index.html'), 'PayablesController',
    meta('forward', i18n.all('payables', 'payables-desc'))),

  route(C.receivables, '/receivables', require('templates/receivables/index.html'), 'ReceivablesController',
    meta('backward', i18n.all('receivables', 'receivables-desc'))),

  route(C.reports, '/reports', require('templates/reports/index.html'), 'ReportsController',
    meta('assignment', i18n.all('reports', 'reports-desc'))),

  route(C.users, '/users', require('templates/users/index.html'), 'UsersController',
    meta('accounts', i18n.all('users', 'users-desc'))),

  freeRoute(C.auth, '/auth', require('templates/auth.html'), 'AuthController'),

  freeRoute(C.logout, '/logout', null, 'LogoutController')
];