var toastr = require("toastr");

/**
 * Cuida do tratamento de erros gerais, redirecionando para formularios(directive error)
 * ou para gambiarras em geral.
 * @param $rootScope
 * @param $q
 */
module.exports = /*@ngInject*/ function ChaosFactory($rootScope, $q) {
  var Chaos = function () {
    this.bring = function (message, alias, context = "") {

    };

    this.follow = function (promisedRequest) {
      return promisedRequest.catch((ex) => {
        var response = ex.data;
        if(response && response.errors && response.errors.length > 0) {
          response.errors.filter(m => m.field == "general").forEach(m => {
            toastr.error(m.message);
          });
        } else if (ex.status == 404) {
          toastr.error("Uma requisição invalida foi enviada ao servidor.");
        }
        $rootScope.$broadcast("chaos.parcel", ex.data.errors);
        return $q.reject(ex);
      }).then((response) => {
        $rootScope.$broadcast("chaos.parcel", []);
        if(response && response.messages && response.messages.length > 0) {
          response.messages.filter(m => m.code == "general").forEach(m => {
            toastr.info(m.message);
          });
        }
        return response;
      });
    };
  };

  return new Chaos();
};