/**
 * Resource dos serviços
 * @param $resource
 * @returns {*}
 */
module.exports = /*@ngInject*/ function Jobs($resource) {
  return $resource('/jobs/:id', null, {
    'update': {method: 'PUT'}
  });
};