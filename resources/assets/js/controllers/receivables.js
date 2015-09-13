var { toolbarItem } = require('../helpers/page');
var R = require('ramda');

/**
 * Controller de Contas a Receber
 * @module controllers
 * @type {*[]}
 */

module.exports = /*@ngInject*/ function ReceivablesController($scope, $rootScope, $q, $location, $routeParams, $http, ngTableParams, Receivables, Loading, Modals) {
  $scope.form = {};

  $scope.toolbarItems = [
    toolbarItem("list", null, "view-list", "/receivables"),
    toolbarItem("new", null, "plus", "/receivables/new")
  ];

  $scope.tableParams = new ngTableParams({
    page: 1,
    count: 10,
    sorting: {
      'receivable.id': 'desc'
    }
  }, {
    total: 0,
    getData: function ($defer, params) {
      // ajax request to api
      Loading.followR(Receivables.get(params.url(), (result) => {
        params.total(result.parcel.total);
        $defer.resolve(result.parcel.result);
      }));
    }
  });

  var receivable = null;

  if ($routeParams.id) {
    Loading.followR(Receivables.get({id: $routeParams.id}))
      .then((receivable) => {
        if (receivable.parcel) {
          $scope.form = receivable.parcel;
        } else {
          $location.path('/receivables');
        }
      }).catch(ex => $location.path('/receivables'));
  }

  $scope.search = (search) => {
    $scope.tableParams.filter({id: search.query, name: search.query, 'customers.name': search.query});
  };

  $scope.save = () => {
    var request = null;
    if ($scope.form.id) {
      request = Loading.followR(Receivables.update({id: $scope.form.id}, $scope.form))
    } else {
      request = Loading.followR(Receivables.save($scope.form))
    }

    request.then(() => {
      $location.path('/receivables')
    });

  };

  $scope.getTotal = () => {
    return R.ifElse(
      R.allPass([
        Array.isArray,
        R.compose(
          R.not,
          R.isEmpty
        )
      ]),
      R.pipe(
        R.map(_ => parseFloat(_.price)),
        R.sum
      ),
      R.always(0)
    )($scope.form.installments);
  };

  $scope.remove = (item) => {
    Modals
      .confirm("Você deseja realmente remover essa ordem de serviço?")
      .then(function () {
        Loading.followR(Receivables.delete({id: item.id})).then(() => {
          $scope.tableParams.reload();
        });
      });
  };

  $scope.getEditUrl = (receivable) => {
    return `#/receivables/edit/${receivable.id}`;
  };

  $scope.getStatusClass = (status) => {
    switch (status) {
      case 1:
        return "btn-success";
        break;
      case 2:
        return "btn-warning";
        break;
      default:
        return "btn-warning";
        break;
    }
  };


  $scope.getStatusName = (status) => {
    switch (status) {
      case 1:
        return "Ok";
        break;
      case 2:
        return "Pendente";
        break;
      default:
        return "Pendente";
        break;
    }
  };

  $scope.setStatus = (item, status) => {
    Loading.followP($http.post(`receivables/set-status/${item.id}`, {status})).then(_ => item.status = status);
  }


};