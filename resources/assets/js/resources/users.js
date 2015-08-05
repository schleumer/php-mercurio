/**
 * Resource dos usuários
 * @param $resource
 * @returns {*}
 * @ngInject
 */
module.exports = function Users($resource) {
  return $resource('/users', null, {
    'update': {method: 'PUT'}
  });
};