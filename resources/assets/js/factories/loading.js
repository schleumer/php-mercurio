/**
 * Factory resposável pelo loading, redirecionando os eventos para a directive de loading
 * @see {@link directives.loading}
 * @param $rootScope
 * @returns Function
 * @ngInject
 */
module.exports = function Loading($rootScope) {
  var Loading = function () {
    this.start = () => {
      $rootScope.appLoadingClass = "app-loading";
      $rootScope.$emit('appLoading:start');
    };

    this.stop = () => {
      $rootScope.appLoadingClass = "";
      $rootScope.$emit('appLoading:stop');
    };

    this.follow = ($q) => {
      this.start();
      return $q.then((obj) => {
        return obj;
      }).finally(() => {
        this.stop();
      });
    };

    this.followCallback = (future) => {
      this.start();
      return function () {
        this.stop();
        future.apply(null, arguments);
      }.bind(this);
    }
  };

  return new Loading();
};