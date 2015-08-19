/**
 * Resource de ordem de serviços
 * @param $resource
 * @returns {*}
 */
module.exports = /*@ngInject*/ function JobOrders($resource) {
  return $resource('/job-orders/:id', null, {
    'update': {method: 'PUT'}
  });
};