/**
 * Cuida do tratamento de erros gerais, redirecionando para formularios(directive error)
 * ou para gambiarras em geral.
 * @param $rootScope
 * @param $q
 * @returns {*}
 * @ngInject
 */
module.exports = function Chaos($rootScope, $q) {
  return {
    bring (message, alias, context = "") {

    },
    follow (requestQ) {
      return requestQ.then((response) => {
        //$rootScope.$emit("chaos.parcel")
        return response;
      }).catch((ex) => {
        $rootScope.$emit("chaos.parcel", ex.data.errors);
        return $q.reject(ex);
      });
    }
  };
};