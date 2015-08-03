var { toolbarItem } = require('../helpers/page');


/**
 * Controller de Clientes
 * @module controllers
 * @ngInject
 */
module.exports = function CustomersController($scope, $rootScope, ngTableParams, Customers, Chaos, Loading) {
  $scope.form = {};

  $scope.toolbarItems = [
    toolbarItem("list", null, "view-list", "/customers"),
    toolbarItem("new", null, "plus", "/customers/new")
  ];

  $scope.tableParams = new ngTableParams({
    page: 1,
    count: 10,
    sorting: {
      name: 'asc'
    }
  }, {
    total: 0,
    getData: function ($defer, params) {
      // ajax request to api
      Loading.follow($defer.promise);
      Customers.get(params.url(), (result) => {
        console.log(result);
        params.total(result.parcel.total);
        $defer.resolve(result.parcel.result);
      });
    }
  });

  $scope.save = () => {
    Customers.save($scope.form);
  }
};