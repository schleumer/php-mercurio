/**
 * Resource de ordem de serviços
 * @param $resource
 * @returns {*}
 * @ngInject
 */
module.exports = function JobOrders($resource) {
  return $resource('/job-orders/:id', null, {
    'update': {method: 'PUT'}
  });
};