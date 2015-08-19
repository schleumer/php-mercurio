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
module.exports = /*@ngInject*/ function PageToolbar($rootScope) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    template: require('templates/directives/pageToolbar.html'),
    scope: {
      items: '=',
      withSearch: '=',
      onSearch: '&'
    },
    link: function (scope, element, attrs, ctrl) {
      scope.search = { query: "" };
      scope.getClassForButton = (item) => {
        return `btn-${item.type}`;
      };

      scope.getClassForIcon = (item) => {
        return `zmdi-${item.icon}`;
      };

      scope.triggerSearch = () => {
        if(scope.onSearch) {
          scope.onSearch()(scope.search);
        }
      };

      scope.buildUrlFromPath = $rootScope.buildUrlFromPath;
    }
  }
};