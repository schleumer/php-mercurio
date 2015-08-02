/**
 * TODO: ISSO AQUI TA MUITO ERRADO
 * Factory de Autenticação porque sim
 * @param $http
 * @param $localStorage
 * @param $q
 * @param Users
 * @ngInject
 */
module.exports = function Auth($http, $localStorage, $q, $rootScope) {
  var Auth = function() {
    this.token = null;
    this.user = null;

    this.setUser = (user) => {
      $rootScope.user = user;
      return this.user = user;
    };

    /**
     *
     * @param credentials
     * @returns {HttpPromise}
     */
    this.login = function(credentials) {
      return $http.post('auth/login', credentials).then((response) => {
        return this.setUser(response.data.parcel);
      });
    };

    this.logout = function() {
      return $http.delete('auth/login').then((response) => {
        return this.setUser(null);
      });
    };

    this.remoteCheck = function() {
      return $http.get('auth/login').then((response) => {
        if (!response.data.parcel) {
          return $q.reject(new Error("user not logged in"));
        }
        return this.setUser(response.data.parcel);
      });
    };

    this.check = function() {
      return $q((resolve, reject) => {
        resolve(this.user || this.remoteCheck());
      });
    };

    this.isAuthenticated = function() { return this.user != null; },
    this.getUser = function() { return this.user; }
  };

  return new Auth();
};