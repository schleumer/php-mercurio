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
module.exports = /*@ngInject*/ function Page($rootScope) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    template: require('templates/directives/page.html'),
    scope: {},
    link: function(scope, element, attrs, ctrl) {

    }
  }
};