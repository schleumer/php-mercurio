var $ = require('jquery');
var S = require('string');

/**
 *
 * @ngInject
 */
module.exports = function Numeric($rootScope, $timeout) {
  return {
    restrict: 'E',
    require: '?^appForm',
    template: require('templates/directives/numeric.html'),
    scope: {
      fieldModel: '=ngModel',
      fieldName: '@name',
      i18nLabel: '@label',
      hideLabel: '=',
      decimals: '=',
      decimal: '@',
      thousand: '@',
      prefix: '@'
    },
    link: (scope, element, attrs, form) => {
      scope.formName = form.getName();
      scope.fieldLabel = $rootScope.str(scope.i18nLabel);
      scope.fieldContext = `${scope.formName}.${scope.fieldName}`;
      scope.fieldId = `app-number-${scope.formName}-${scope.fieldName}`;

      var $input = element
        .find('input');

      var decimal = scope.decimal || ",";
      var thousand = scope.thousand || ".";
      var decimalsSize = scope.decimals || 2;
      var decimals = S("0").repeat(decimalsSize).s;

      var localCommit = false;

      var mask = `#${thousand}##0${decimal}${decimals}`;
      var maskOptions = {
        reverse: true
      };

      var init = () => {
        scope.auxModel = scope.fieldModel || "";

        scope.fieldModel = parseFloat(scope.fieldModel || 0);

        localCommit = true;

        // ಠ_ಠ
        $input.val(scope.auxModel).mask(mask, maskOptions).trigger('input');
      };

      $input
        .mask(mask, maskOptions).on('input', function () {
          $timeout(() => {
            scope.$apply(() => {
              scope.fieldModel = parseFloat(this.value
                  .split(thousand)
                  .join('')
                  .split(decimal)
                  .join('.')) || 0;
            });
          });
        });

      init();

      scope.$watch('fieldModel', function (newVal, oldVal) {
        if (newVal == oldVal) {
          return;
        }

        init();
      });
    }
  }
};