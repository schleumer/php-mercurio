var _ = require('underscore');
var $ = require('jquery');

/**
 * TODO: LIMPAR ESSE CÓDIGO que foi copiado de um projeto antigo
 * @param $filter
 * @param $rootScope
 * @param $parse
 * @returns {{replace: boolean, transclude: string, restrict: string, scope: {label: string, items: string, itemModel: string, filter: string, itemKey: string, itemTemplate: string, maxItems: string, full: string}, templateUrl: string, link: Function}}
 * @ngInject
 */
module.exports = function ($filter, $rootScope, $parse) {
  return {
    replace: true,
    transclude: 'true',
    restrict: 'E',
    scope: {
      'label': '@',
      'items': '=ngModel',
      'itemModel': '@',
      'filter': '@',
      'itemKey': '@',
      'itemTemplate': '@',
      'maxItems': '=',
      'full': '='
    },
    template: require('templates/directives/listOfItems.html'),
    link: function (scope, element, attributes, itsNullAndNobodyCares, transclude) {
      /**
       * Child transcluded element hack
       * Parece gambiarra mas não é! Toda vez que um elemento é transincluso, ele é criado com um escopo a parte, esse escopo é isolado e só acessivel por gambiarra
       * para não ter esse problema, eu transincludo esse elemento utilizando o mesmo escopo do escopo corrente, assim os dois compartilham do mesmo escopo
       * sem gambiarras :P
       */
      transclude(scope, function (child) {
        $(element)
          .find('.transclude-here')
          .append(child);
      });

      scope.$watch('items', function () {
        scope._items = [];
        _.each(scope.items, function (k, v) {
          scope.value = v;
          scope._items.push({
            value: scope.value,
            model: v
          });
        });
        scope.value = null;
      });

      scope._items = [];
      scope.removeItem = function (item) {
        scope.items.splice(scope.items.indexOf(item.model), 1);
        scope._items.splice(scope._items.indexOf(item), 1);
      };

      scope.maskIt = function (v) {
        return $filter(scope.filter)(v);
      };

      scope.getValue = function (item) {
        var val = '';
        if (scope.itemKey) {
          val = $rootScope.dot(item, scope.itemKey);
        } else if (scope.itemTemplate) {
          val = $parse(scope.itemTemplate)(item);
        } else {
          val = item;
        }
        if (scope.filter) {
          val = scope.maskIt(val);
        }
        return val;
      };

      scope.addItem = function () {
        if (!scope.value) return;
        if (!scope.items) {
          scope.items = [];
        }
        if (scope.maxItems) {
          if (scope.items.length >= scope.maxItems) {
            alert('Numero maximos de items já preenchido.');
            return;
          }
        }
        var modelValue = scope.itemModel ? scope.$eval(scope.itemModel) : scope.value;
        scope.items.push(modelValue);
        scope.value = null;
        console.log(scope.items);
      }
    }
  };
};