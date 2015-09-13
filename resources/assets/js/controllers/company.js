/**
 * Controller para exibir a empresa atrelada ao atual usuário
 * @module controller
 * @type {*[]}
 */
module.exports = /*@ngInject*/ function CompanyController($scope, $http, Auth) {
  $scope.form = Auth.getUser().company;
};