/**
 * Directive para a barra de navegação esquerda
 * @returns {{restrict: string, replace: boolean, template: *, link: Function}}
 * @ngInject
 */
module.exports = function LeftNav() {
  return {
    restrict: 'E',
    replace: true,
    template: require('templates/directives/left-nav.html'),
    link: (scope, element, attrs) => { }
  }
};