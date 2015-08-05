/**
 * Resource dos usuários
 * @param $resource
 * @returns {*}
 * @ngInject
 */
module.exports = function Customers($resource) {
  return $resource('/customers/:id', null, {
    'update': {method: 'PUT'}
  });
};