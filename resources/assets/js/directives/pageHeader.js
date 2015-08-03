/**
 *
 * @param $rootScope
 * @returns {{
 *   restrict: string,
 *   replace: boolean,
 *   template: *,
 *   link: Function
 * }}
 * @ngInject
 */
module.exports = function PageHeader($rootScope) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    template: require('templates/directives/pageHeader.html'),
    scope: {
      icon: '@'
    },
    link: (scope, element, attrs, ctrl) => {
      scope.getTitleIcon = function() {
        return scope.icon ? `zmdi-${scope.icon}` : '';
      }
    }
  }
};