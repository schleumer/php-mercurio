/**
 * Resource dos serviços
 * @param $resource
 * @returns {*}
 * @ngInject
 */
module.exports = function Payables($resource) {
  return $resource('/payables/:id', null, {
    'update': {method: 'PUT'}
  });
};