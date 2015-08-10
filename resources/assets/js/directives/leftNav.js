/**
 * Directive para a barra de navegação esquerda
 * @returns {{restrict: string, replace: boolean, template: *, link: Function}}
 * @ngInject
 */
module.exports = function LeftNav($rootScope, $location) {
  return {
    restrict: 'E',
    replace: true,
    template: require('templates/directives/leftNav.html'),
    link: (scope, element, attrs) => {
      scope.isCurrent = (path) => {

      };

      scope.getClassForRoute = (route) => {
        // HEHEHEHEHEHEHEHEHE
        if(route.path != '/') {
          return $location.path().indexOf(route.path) > -1 ? 'active' : '';
        } else {
          return $location.path() == route.path ? 'active' : '';
        }
      };
    }
  }
};