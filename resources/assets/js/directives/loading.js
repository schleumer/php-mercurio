/**
 * Directive responsável pelo "loading" da aplicação(eye candy)
 * @param $rootScope
 * @returns {{
 *   restrict: string,
 *   replace: boolean,
 *   template: *,
 *   link: Function
 * }}
 */
module.exports = /*@ngInject*/ function Loading($rootScope) {
  return {
    restrict: 'E',
    replace: true,
    template: require('templates/directives/loading.html'),
    link: (scope, element, attrs) => {
      scope.loading = false;

      $rootScope.$on('appLoading:start', () => {
        scope.loading = true;
      });

      $rootScope.$on('appLoading:stop', () => {
        scope.loading = false;
      })
    }
  }
};