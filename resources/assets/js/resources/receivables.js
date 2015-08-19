/**
 * Resource de contas a receber
 * @param $resource
 * @returns {*}
 * @ngInject
 */
module.exports = function Receivables($resource) {
  return $resource('/receivables/:id', null, {
    'update': {method: 'PUT'}
  });
};