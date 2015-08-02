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
module.exports = function Error($rootScope) {
  return {
    restrict: 'E',
    replace: true,
    template: require('templates/directives/error.html'),
    scope: {
      context: '@for'
    },
    link: (scope, element, attrs) => {
      scope.errors = [];
      var contextRegExp = utils.dot2regexp(scope.context);

      scope.$watch('context', (val) =>  {
        contextRegExp = utils.dot2regexp(val);
      });

      $rootScope.$on("chaos.parcel", (ev, errors) => {
        scope.errors = errors.filter(function(error) {
          return contextRegExp.test(error.field);
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