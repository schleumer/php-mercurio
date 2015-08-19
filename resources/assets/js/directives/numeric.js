var $ = require('jquery')
  , S = require('string')
  , angular = require('angular');

/**
 *
 */
module.exports = /*@ngInject*/ function Numeric($rootScope, $timeout) {
  return {
    restrict: 'E',
    require: '?^appForm',
    template: require('templates/directives/numeric.html'),
    scope: {
      fieldModel: '=ngModel',
      fieldName: '@name',
      label: '@',
      hideLabel: '=',
      decimals: '=',
      decimal: '@',
      thousand: '@',
      prefix: '@',
      right: '='
    },
    link: (scope, element, attrs, form) => {
      scope.formName = form.getName();
      scope.fieldLabel =  $rootScope.str(scope.label);
      scope.fieldContext = `${scope.formName}.${scope.fieldName}`;
      scope.fieldId = `app-number-${scope.formName}-${scope.fieldName}`;

      var decimal = scope.decimal || ",";
      var thousand = scope.thousand || ".";
      var decimalsSize = scope.decimals || 2;
      var decimals = S("0").repeat(decimalsSize).s;

      var localCommit = false;

      var $input = element.find('input').inputmask("numeric", {
        //prefix: scope.prefix && `${scope.prefix} `,
        groupSeparator: ".",
        radixPoint: ",",
        placeholder: `0,${decimals}`,
        autoGroup: true,
        radixFocus: true,
        digits: decimalsSize,
        digitsOptional: false,
        decimalProtect: true,
        oncomplete: function() {
          $timeout(_ => {
            scope.fieldModel = parseFloat(this.value
                .split(thousand)
                .join('')
                .split(decimal)
                .join('.')) || 0;
            scope.auxModel = scope.fieldModel;
          });

        },
        onincomplete: function() {
          $timeout(_ => {
            scope.fieldModel = parseFloat(this.value
                .split(thousand)
                .join('')
                .split(decimal)
                .join('.')) || 0;
            scope.auxModel = scope.fieldModel;
          });
        }
      });

      scope.$watch('fieldModel', function (val) {
        if(scope.auxModel === scope.fieldModel) {
          return;
        }
        $input.val(val);
      });

      //scope.$watch('auxModel', function(val, oldVal) {
      //  if(angular.equals(val, oldVal)) {
      //    return;
      //  }
      //
      //  scope.fieldModel = parseFloat(val
      //      .split(thousand)
      //      .join('')
      //      .split(decimal)
      //      .join('.')) || 0;
      //});

      //var init = () => {
      //  // todo: fix
      //  scope.auxModel = scope.fieldModel
      //    ? (
      //      typeof scope.fieldModel == "string"
      //      ? parseFloat(scope.fieldModel).toFixed(decimalsSize)
      //      : scope.fieldModel.toFixed(decimalsSize)
      //    ) : "";
      //
      //  scope.fieldModel = parseFloat(scope.fieldModel || 0);
      //
      //  localCommit = true;
      //};
      //
      //var $input = element.find('input');
      //
      //
      //$input
      //  .mask(`#${thousand}##0${decimal}${decimals}`, {
      //    reverse: !!scope.right
      //  }).on('input', function () {
      //    $timeout(() => {
      //      scope.$apply(() => {
      //        scope.fieldModel = parseFloat(this.value
      //            .split(thousand)
      //            .join('')
      //            .split(decimal)
      //            .join('.')) || 0;
      //        localCommit = true;
      //      });
      //    });
      //  });
      //
      //init();
      //
      //scope.$watch('fieldModel', function () {
      //  if (localCommit) {
      //    localCommit = false;
      //    return;
      //  }
      //
      //  init();
      //});
      //
      //scope.$watch('right', function(val) {
      //  if(val){
      //    $input.css({'text-align': 'right'})
      //  } else {
      //    $input.css({'text-align': 'left'})
      //  }
      //});
    }
  }
};