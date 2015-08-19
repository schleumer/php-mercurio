/**
 *
 * @param $rootScope
 * @returns {{
 *   restrict: string,
 *   replace: boolean,
 *   template: *,
 *   link: Function
 * }}
 */
module.exports = /*@ngInject*/ function PageHeader($rootScope) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    template: require('templates/directives/pageHeader.html'),
    scope: {
      icon: '@'
    },
    link: function (scope, element, attrs, ctrl) {
      scope.getTitleIcon = function() {
        return scope.icon ? `zmdi-${scope.icon}` : '';
      }
    }
  }
};