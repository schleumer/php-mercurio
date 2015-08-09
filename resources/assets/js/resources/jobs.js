/**
 * Resource dos serviços
 * @param $resource
 * @returns {*}
 * @ngInject
 */
module.exports = function Jobs($resource) {
  return $resource('/jobs/:id', null, {
    'update': {method: 'PUT'}
  });
};