var routes = require("../routes");
var { routePrefix } = require('./index');

/**
 *
 */
module.exports = /*@ngInject*/ function run($rootScope, $templateCache, Auth, vendorVersion, appVersion) {
  $templateCache.put('custom/pager', require('templates/custom-pager.html'));
  $rootScope.vendorVersion = vendorVersion;
  $rootScope.appVersion = appVersion;

  $rootScope.appLoadingClass = "app-loading";
  $rootScope.routes = routes;
  $rootScope.str = $i18n('templates').get;

  $rootScope.getLeftNavClass = () => {
    return Auth.isAuthenticated() ? 'col-xs-3' : 'hidden';
  };

  $rootScope.getContainerClass = () => {
    return Auth.isAuthenticated() ? 'col-xs-9' : 'col-xs-12';
  };

  $rootScope.getAppBarNavClass = () => {
    return Auth.isAuthenticated() || 'ayyyy';
  };

  $rootScope.isUserPresent = () => {
    return Auth.isAuthenticated();
  };

  $rootScope.isNavigable = (item) => {
    return !!item.meta;
  };

  $rootScope.buildUrlFromPath = (path) => {
    return routePrefix + path;
  };

  var interations = 0;
  $rootScope.testInterations = () => {
    interations += 1;
    console.log("interation %d", interations);
  };


  /**
   * TODO: trocar
   * @param obj
   * @param is
   * @param value
   * @returns {*}
   */
  $rootScope.dot = function (obj, is, value) {
    if (!is) {
      return obj;
    } else {
      if (typeof is == 'string')
        return $rootScope.dot(obj, is.split('.'), value);
      else if (is.length == 1 && value !== undefined)
        return obj[is[0]] = value;
      else if (is.length == 0)
        return obj;
      else
        return $rootScope.dot(obj[is[0]], is.slice(1), value);
    }
  }
};