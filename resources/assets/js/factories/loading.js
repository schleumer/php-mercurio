var R = require('ramda');

/**
 * Factory resposável pelo loading, redirecionando os eventos para a directive de loading
 * @see {@link directives.loading}
 * @returns Function
 * @ngInject
 */
module.exports = function Loading($rootScope, Chaos) {
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
      }).finally((r) => {
        this.stop();
        return r;
      });
    };

    this.followCallback = (future) => {
      this.start();
      return function () {
        this.stop();
        future.apply(null, arguments);
      }.bind(this);
    };

    this.followP = R.pipe(
      Chaos.follow,
      this.follow
    );

    this.followR = R.pipe(
      (req) => req.$promise,
      Chaos.follow,
      this.follow
    );
  };

  return new Loading();
};