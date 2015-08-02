/**
 * Controller da Pagina Inicial
 * @module controller
 * @type {*[]}
 * @ngInject
 */
module.exports = function HomeController($scope, Auth) {
  console.log(Auth.getUser());
};