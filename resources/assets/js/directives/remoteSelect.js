var $ = require('jquery');
var Bloodhound = require('typeahead.js/dist/bloodhound');

var keys = {
  UP: 38,
  DOWN: 40,
  ESC: 27,
  ENTER: 13
};

/**
 * @todo Organizar
 * @returns {{
 *   restrict: string,
 *   replace: boolean,
 *   template: *,
 *   link: Function
 * }}
 */
module.exports = /*@ngInject*/ function RemoteSelect($rootScope, $http, $timeout) {
  return {
    restrict: 'E',
    require: '?^appForm',
    replace: true,
    template: require('templates/directives/remoteSelect.html'),
    scope: {
      url: '@',
      ngModel: '=',
      relativeTo: '=',
      label: '@',
      hideLabel: '=',
      fieldName: '@name',
      fieldType: '@type'
    },
    link: (scope, element, attrs, form) => {
      scope.formName = form ? form.getName() : 'default';
      scope.fieldType = scope.fieldType || "text";
      scope.fieldLabel = $rootScope.str(scope.label);
      scope.fieldContext = `${scope.formName}.${scope.fieldName}`;
      scope.fieldId = `app-test-${scope.formName}-${scope.fieldName}`;

      var localCommit = false;
      var engine = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 10,
        identify: function (obj) {
          return obj.id;
        },
        remote: {
          url: `${scope.url}?q=%QUERY`,
          wildcard: '%QUERY',
          transform: function (res) {
            return res.parcel.result;
          }
        }
      });


      var search = (q) => {
        engine.search(q, (res) => {
          $timeout(() => {
            scope.ui.currentSelectedIndex = -1;
            scope.ui.results = res;
          })
        }, (res) => {
          $timeout(() => {
            scope.ui.currentSelectedIndex = -1;
            scope.ui.results = res;
          });
        });
      };

      search("");

      scope.ui = {
        results: [],
        search: "",
        currentSelectedIndex: -1
      };

      scope.getClassIfActive = (index) => {
        var current = scope.ui.results[index];

        // LONG LIVE TO THE SHORTCIRCUIT
        return (
          scope.ui.currentSelectedIndex == index
          || (
            current
            && scope.ngModel
            && current.id
            && scope.ngModel.id
            && current.id == scope.ngModel.id
          )
        ) ? 'active' : '';
      };

      scope.getCurrent = () => {
        return scope.ngModel
          ? scope.ngModel
          : (scope.ui.results[scope.ui.currentSelectedIndex] || null);
      };


      scope.getCurrentLabel = () => {
        var current = scope.getCurrent();
        return current ? current.name : scope.label;
      };

      scope.getLabelClass = () => {
        var current = scope.getCurrent();
        return current ? 'app-remote-select-selected  ' : 'text-grayer';
      };

      scope.getCurrentShadow = () => {
        var current = scope.getCurrent();
        return (current && current.name && current.name.indexOf(scope.ui.search) == 0) ? current.name : '';
      };

      scope.getPlaceholder = () => {
        var current = scope.getCurrent();
        return (current && current.name) ? '' : scope.label;
      };

      scope.pick = ($index) => {
        if ($index > -1
          && $index < scope.ui.results.length) {
          localCommit = true;
          scope.ui.currentSelectedIndex = $index;
          scope.ngModel = scope.ui.results[$index];
          hideDropdown();
        }
      };

      var $el = $(element);
      var $holder = $el.find('.app-remote-select-holder');
      var $dropdown = $el.find('.app-remote-select-dropdown');
      var $input = $el.find('.app-remote-select-search-input');
      var $touchArea = $el.find('.touch-area');

      var selectOnIndex = () => {
        if (scope.ui.currentSelectedIndex > -1
          && scope.ui.currentSelectedIndex < scope.ui.results.length) {
          $timeout(() => {
            localCommit = true;
            scope.ngModel = scope.ui.results[scope.ui.currentSelectedIndex]
          });
          hideDropdown();
        }
      };

      var hideDropdown = () => {
        $dropdown.hide();
      };

      $touchArea
        .on('click', function (ev) {
          $dropdown.show();
          $input
            .focus();
          ev.stopPropagation();
        });

      var indexUp = () => {
        if (scope.ui.currentSelectedIndex > -1
          && scope.ui.currentSelectedIndex < scope.ui.results.length) {
          $timeout(() => scope.ui.currentSelectedIndex -= 1);
        }
      };

      var indexDown = () => {
        if (scope.ui.currentSelectedIndex >= -1
          && scope.ui.currentSelectedIndex < scope.ui.results.length - 1) {
          $timeout(() => scope.ui.currentSelectedIndex += 1);
        }
      };

      $input.on('keyup', (ev) => {
        switch (ev.which) {
          case keys.DOWN:
            indexDown();
            ev.stopPropagation();
            return;
            break;
          case keys.UP:
            indexUp();
            ev.stopPropagation();
            return;
            break;
          case keys.ESC:
            hideDropdown();
            ev.stopPropagation();
            return;
            break;
          case keys.ENTER:
            selectOnIndex();
            ev.stopPropagation();
            return;
            break;
        }
      });

      $holder.on('focus', () => {
        $touchArea.click();
      });

      $input.on('input', () => {
        console.log($input.val());
        search($input.val());
      });

      $input.on('blur', (ev) => {
        if (ev.relatedTarget && !$.contains($dropdown[0], ev.relatedTarget)) {
          hideDropdown();
        } else if (!ev.relatedTarget) {
          hideDropdown();
        }
      });

      $(document).on('click', () => {
        //hideDropdown();
      });

      $dropdown.on('click focus', (ev) => {
        ev.stopPropagation();
      });

      scope.$watch('ngModel', (value) => {
        if(localCommit) {
          localCommit = false;
          return;
        }

        scope.ui.currentSelectedIndex = -1;
      });
    }
  }
};