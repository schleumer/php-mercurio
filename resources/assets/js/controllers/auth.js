var R = require("ramda");

/**
 * Controller de Autenticação
 * @param $scope
 * @param $location
 * @param Loading
 * @param Chaos
 * @param Auth
 * @constructor
 * @ngInject
 */
module.exports = function AuthController($scope, $location, Loading, Chaos, Auth) {
  $scope.form = {email: '', password: ''};

  Loading
    .follow(Auth.remoteCheck())
    .then(() => $location.path('/'));

  $scope.login = () => {
    R.pipe(
      Loading.follow,
      Chaos.follow
    )(Auth.login($scope.form))
      .then(() => $location.path('/'));
  }
};