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
module.exports = function Text($rootScope) {
  return {
    restrict: 'E',
    transclude: true,
    template: require('templates/directives/form.html'),
    scope: {
      name: '@name',
      ngSubmit: '&'
    },
    link: (scope, element, attrs, ctrl) => {
    },
    /* @ngAnnotate */
    controller: function ($scope) {
      $scope.test = "lel";
      this.getName = () => {
        return $scope.name;
      }
    }
  }
};