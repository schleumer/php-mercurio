/**
 * Cuida do tratamento de erros gerais, redirecionando para formularios(directive error)
 * ou para gambiarras em geral.
 * @param $rootScope
 * @param $q
 * @ngInject
 */
module.exports = function ChaosFactory($rootScope, $q) {
  var Chaos = function () {
    this.bring = function (message, alias, context = "") {

    };

    this.follow = function (promisedRequest) {
      return promisedRequest.then((response) => {
        $rootScope.$broadcast("chaos.parcel", []);
        return response;
      }).catch((ex) => {
        $rootScope.$broadcast("chaos.parcel", ex.data.errors);
        return ex;
      });
    };
  };

  return new Chaos();
};