var R = require("ramda");

/**
 * Controller de Logout(HAHAHAHAHAHAHAHAHAHAHAHAHAHA, po, Angular, assim você força a amizade)
 * @param $scope
 * @param $location
 * @param Loading
 * @param Chaos
 * @param Auth
 * @constructor
 */
module.exports = /*@ngInject*/ function LogoutController($scope, $location, Loading, Chaos, Auth) {
  Loading
    .follow(Auth.logout())
    .then(() => $location.path('/auth'));
};