/**
 * Resource dos serviços
 * @param $resource
 * @returns {*}
 */
module.exports = /*@ngInject*/ function Payables($resource) {
  return $resource('/payables/:id', null, {
    'update': {method: 'PUT'}
  });
};