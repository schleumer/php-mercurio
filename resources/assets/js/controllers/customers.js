var { toolbarItem } = require('../helpers/page');
var R = require('ramda');

/**
 * Controller de Clientes
 * @module controllers
 * @ngInject
 */
module.exports = function CustomersController($scope, $rootScope, $q, $location, $routeParams, ngTableParams, Customers, Chaos, Loading) {
  $scope.form = {};

  $scope.toolbarItems = [
    toolbarItem("list", null, "view-list", "/customers"),
    toolbarItem("new", null, "plus", "/customers/new")
  ];

  $scope.tableParams = new ngTableParams({
    page: 1,
    count: 10,
    sorting: {
      id: 'desc'
    }
  }, {
    total: 0,
    getData: function ($defer, params) {
      // ajax request to api
      Loading.follow($defer.promise);
      Customers.get(params.url(), (result) => {
        params.total(result.parcel.total);
        $defer.resolve(result.parcel.result);
      });
    }
  });

  var customer = null;

  if ($routeParams.id) {
    R.pipe(
      Chaos.follow,
      Loading.follow
    )(Customers.get({id: $routeParams.id}).$promise)
      .then((customer) => {
        if(customer.parcel) {
          $scope.form = customer.parcel;
        } else {
          $location.path('/customers');
        }
      });
  }

  $scope.search = (search) => {
    $scope.tableParams.filter({id: search.query, name: search.query, cnpj: search.query});
  };

  $scope.save = () => {
    if($scope.form.id) {
      R.pipe(
        Chaos.follow,
        Loading.follow
      )(Customers.update({ id: $scope.form.id }, $scope.form).$promise)
        .then(() => {
          $location.path('/customers')
        });
    } else {
      R.pipe(
        Chaos.follow,
        Loading.follow
      )(Customers.save($scope.form).$promise)
        .then(() => {
          $location.path('/customers')
        });
    }

  };

  $scope.getEditUrl = (customer) => {
    return `#/customers/edit/${customer.id}`;
  }


};