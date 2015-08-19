/**
 * Resource de contas a receber
 * @param $resource
 * @returns {*}
 */
module.exports = /*@ngInject*/ function Receivables($resource) {
  return $resource('/receivables/:id', null, {
    'update': {method: 'PUT'}
  });
};