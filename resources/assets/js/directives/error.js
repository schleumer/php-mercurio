var { utils } = require('../helpers');

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
module.exports = function Error($rootScope, $timeout) {
  return {
    restrict: 'E',
    replace: true,
    template: require('templates/directives/error.html'),
    scope: {
      context: '@for'
    },
    link: (scope, element, attrs) => {
      scope.errors = [];
      $rootScope.$on("chaos.parcel", (ev, errors) => {
        scope.errors = errors.filter(function(error) {
          return error.field.match(utils.dot2regexp(scope.context));
        });
      });

      scope.getErrorClass = (error) => {
        switch(error.level) {
          case 0:
            return 'text-warning';
          case 1:
            return 'text-danger';
          default:
            return 'text-danger';
        }
      };

      scope.getErrorIconClass = (error) => {
        switch (error.level) {
          case 0:
            return 'zmdi-alert-octagon';
          case 1:
            return 'zmdi-alert-triangle';
          default:
            return 'zmdi-alert-polygon';
        }
      }
    }
  }
};