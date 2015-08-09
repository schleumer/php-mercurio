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
    require: '?^appForm',
    template: require('templates/directives/textArea.html'),
    scope: {
      fieldModel: '=ngModel',
      fieldName: '@name',
      fieldType: '@type',
      i18nLabel: '@label',
      hideLabel: '='
    },
    link: (scope, element, attrs, form) => {
      scope.formName = form.getName();
      scope.fieldType = scope.fieldType || "text";
      scope.fieldLabel = $rootScope.str(scope.i18nLabel);
      scope.fieldContext = `${scope.formName}.${scope.fieldName}`;
      scope.fieldId = `app-test-${scope.formName}-${scope.fieldName}`;
    }
  }
};