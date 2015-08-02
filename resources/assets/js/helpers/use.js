/**
 * @todo deixar mais bonito e purpurinado
 * @param route
 * @returns {{
 *   template: *,
 *   controller: *,
 *   resolve: Function
 * }}
 */
module.exports = function use(route) {
  return {
    template: route.template,
    controller: route.name,
    /* @ngInject */
    resolve: function resolver(Auth, Loading, $location, $q) {
      if (route.free) {
        return Loading.follow($q((resolve) => resolve()));
      } else {
        return Loading.follow(
          Auth
            .check()
            .then((user) => user)
            .catch(() => $location.path('/auth'))
        );
      }
    }
  };
};
