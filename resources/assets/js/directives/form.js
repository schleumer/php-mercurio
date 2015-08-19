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
module.exports = /*@ngInject*/ function Form($rootScope) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    template: require('templates/directives/form.html'),
    scope: {
      name: '@',
      ngSubmit: '&'
    },
    link: (scope, element, attrs, ctrl) => {
    },
    controller: /*@ngInject*/ function ($scope) {
      this.getName = () => {
        return $scope.name;
      }
    }
  }
};