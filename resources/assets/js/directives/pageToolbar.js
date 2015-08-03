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
module.exports = function PageToolbar($rootScope) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    template: require('templates/directives/pageToolbar.html'),
    scope: {
      items: '='
    },
    link: (scope, element, attrs, ctrl) => {
      scope.getClassForButton = (item) => {
        return `btn-${item.type}`;
      };

      scope.getClassForIcon = (item) => {
        return `zmdi-${item.icon}`;
      };

      scope.buildUrlFromPath = $rootScope.buildUrlFromPath;
    }
  }
};