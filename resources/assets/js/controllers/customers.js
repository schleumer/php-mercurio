var { toolbarItem } = require('../helpers/page');
var R = require('ramda');

/**
 * Controller de Clientes
 * @module controllers
 */
module.exports = /*@ngInject*/ function CustomersController($scope, $rootScope, $q, $location, $routeParams, ngTableParams, Customers, Loading, Modals) {
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
    Loading.followR(Customers.get({id: $routeParams.id}))
      .then((customer) => {
        if (customer.parcel) {
          $scope.form = customer.parcel;
        } else {
          $location.path('/customers');
        }
      }).catch(ex => $location.path('/customers'));
  }

  $scope.search = (search) => {
    $scope.tableParams.filter({id: search.query, name: search.query, cnpj: search.query});
  };

  $scope.save = () => {
    var request = null;
    if ($scope.form.id) {
      request = Loading.followR(Customers.update({id: $scope.form.id}, $scope.form))
    } else {
      request = Loading.followR(Customers.save($scope.form))
    }

    request.then(() => {
      $location.path('/customers')
    });

  };

  $scope.remove = (item) => {
    Modals
      .confirm("Você deseja realmente remover esse cliente?")
      .then(function () {
        Loading.followR(Customers.delete({id: item.id})).then(() => {
          $scope.tableParams.reload();
        });
      });
  };

  $scope.getEditUrl = (customer) => {
    return `#/customers/edit/${customer.id}`;
  }


};