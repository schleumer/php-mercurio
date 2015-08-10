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

      var decimal = scope.decimal || ",";
      var thousand = scope.thousand || ".";
      var decimalsSize = scope.decimals || 2;
      var decimals = S("0").repeat(decimalsSize).s;

      var localCommit = false;

      var init = () => {
        // todo: fix
        scope.auxModel = scope.fieldModel
          ? (
            typeof scope.fieldModel == "string"
            ? parseFloat(scope.fieldModel).toFixed(decimalsSize)
            : scope.fieldModel.toFixed(decimalsSize)
          ) : "";

        scope.fieldModel = parseFloat(scope.fieldModel || 0);

        localCommit = true;
      };

      element
        .find('input')
        .mask(`#${thousand}##0${decimal}${decimals}`, {
          reverse: true
        }).on('input', function () {
          $timeout(() => {
            scope.$apply(() => {
              scope.fieldModel = parseFloat(this.value
                  .split(thousand)
                  .join('')
                  .split(decimal)
                  .join('.')) || 0;
              localCommit = true;
            });
          });
        });

      init();

      scope.$watch('fieldModel', function () {
        if (localCommit) {
          localCommit = false;
          return;
        }

        init();
      });
    }
  }
};