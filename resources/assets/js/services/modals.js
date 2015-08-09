var $ = require('jquery')
  , R = require('ramda')
  , assets = require('../assets');

/**
 * @todo reclicar o view do modal
 * @returns {Function}
 * @constructor
 */
module.exports = function ModalsService($compile, $q, $rootScope, $templateCache) {
  var Modals = function (options) {
    var modalFn = $compile(require('templates/modal.html'));

    options = R.merge({
      titleTemplate: null,
      template: null,
      title: '',
      scope: null,
      buttons: null
    }, options);

    var templateFn = $compile(assets.get(options.template));

    // TODO: tentar melhorar isso sem criar 2 scopes
    // kinda gambiarra, mas é o que tem pra hoje.
    var externalScope = $rootScope.$new();
    externalScope.template = options.template;
    externalScope.titleTemplate = options.titleTemplate;
    externalScope.title = options.title;
    externalScope.buttons = options.buttons;

    externalScope.getButtonClass = (button) => {
      return button.primary ? 'btn-primary' : 'btn-default';
    };

    externalScope.getModalFooterType = () => {
      if (!options.buttons
        || !Array.isArray(options.buttons)
        || options.buttons.length == 0) {
        return 'default';
      } else if (typeof options.buttons[0] == "string") {
        return 'exclusive';
      } else {
        return 'custom';
      }
    };

    var compiledModal = modalFn(externalScope);
    var compiledTemplate = templateFn(options.scope || externalScope);

    compiledModal
      .find('.transclude-here')
      .html(compiledTemplate);


    var $modal = $(compiledModal).modal('hide');
    return {
      show: function (cb) {
        cb = cb || new Function;

        $modal
          .one('shown.bs.modal', cb)
          .modal('show');

      },
      close: function(cb) {
        cb = cb || new Function;
        $modal
          .one('hidden.bs.modal', R.pipe(cb, () => {
            $modal.remove();
          }))
          .modal('hide');
      }
    }
  };

  Modals.confirm = function (body) {
    var deferred = $q.defer();
    var scope = $rootScope.$new();
    scope.body = body;
    var modal = Modals({
      title: 'Uma ação necessita de confirmação',
      template: 'templates/modals/confirmation.html',
      scope,
      buttons: [{
        label: 'Sim',
        click: () => {
          deferred.resolve();
          modal.close();
        }
      }, {
        label: 'Não',
        click: () => {
          deferred.reject();
          modal.close();
        }
      }]
    });

    modal.show();

    return deferred.promise;
  };

  return Modals;
};

module.exports.CLOSE = 'close';