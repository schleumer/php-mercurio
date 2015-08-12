var moment = require('moment');
var $ = require('jquery');

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
module.exports = function DateTime($rootScope, $timeout) {
  return {
    restrict: 'E',
    require: '?^appForm',
    template: require('templates/directives/date-time.html'),
    scope: {
      fieldModel: '=ngModel',
      fieldName: '@name',
      fieldType: '@type',
      i18nLabel: '@label',
      hideLabel: '='
    },
    link: (scope, element, attrs, form) => {
      scope.aux = null;

      scope.formName = form.getName();
      scope.fieldType = scope.fieldType || "datetime";
      scope.fieldLabel = $rootScope.str(scope.i18nLabel);
      scope.fieldContext = `${scope.formName}.${scope.fieldName}`;
      scope.fieldId = `app-test-${scope.formName}-${scope.fieldName}`;

      var $field = $(element).find('.app-date-time');

      $field.datetimepicker({
        locale: 'pt-BR',
        format:
          (scope.fieldType == "date")
            ? "L"
            : (scope.fieldType == "time")
              ? "LT"
              : "L LT"
      }).on('dp.change', (ev) => {
        $timeout(_ => scope.fieldModel = ev.date.format("YYYY-MM-DD HH:mm"));
      });

      scope.$watch('fieldModel', (value, oldValue) => {
        if(value == oldValue) return;

        if(value) {
          var date = moment(value);
          $field.val(date.format("L LT")).trigger("change");
        } else {
          $field.val("").trigger("change");
        }
      })

    }
  }
};