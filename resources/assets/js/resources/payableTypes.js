/**
 * Resource dos usuários
 * @param $resource
 * @returns {*}
 */
module.exports = /*@ngInject*/ function PayableTypes($resource) {
  return $resource('/payable-types/:id', null, {
    'update': {method: 'PUT'}
  });
};