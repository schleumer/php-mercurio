/**
 * Resource dos usu�rios
 * @param $resource
 * @returns {*}
 * @ngInject
 */
module.exports = function PayableTypes($resource) {
  return $resource('/payable-types/:id', null, {
    'update': {method: 'PUT'}
  });
};