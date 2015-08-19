var $ = require('jquery');

/**
 *
 * @param $rootScope
 */
module.exports = /*@ngInject*/ function Text($rootScope) {
  return {
    restrict: 'A',
    scope: {
      dropdownOptions: '='
    },
    link: (scope, element, attrs, form) => {
      $(element).dropdown(scope.dropdownOptions || {});
    }
  }
};