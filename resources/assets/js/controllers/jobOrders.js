var { toolbarItem } = require('../helpers/page');
var R = require('ramda');

/**
 * Controller de Ordem de Serviço
 * @module controllers
 * @type {*[]}
 */
module.exports = /*@ngInject*/ function JobOrdersController($scope, $rootScope, $q, $location, $routeParams, $http, ngTableParams, JobOrders, Loading, Modals) {
  $scope.form = {};

  $scope.toolbarItems = [
    toolbarItem("list", null, "view-list", "/job-orders"),
    toolbarItem("new", null, "plus", "/job-orders/new")
  ];

  $scope.tableParams = new ngTableParams({
    page: 1,
    count: 10,
    sorting: {
      'job_orders.id': 'desc'
    }
  }, {
    total: 0,
    getData: function ($defer, params) {
      // ajax request to api
      Loading.followR(JobOrders.get(params.url(), (result) => {
        params.total(result.parcel.total);
        $defer.resolve(result.parcel.result);
      }));
    }
  });

  var jobOrder = null;

  if ($routeParams.id) {
    Loading.followR(JobOrders.get({id: $routeParams.id}))
      .then((jobOrder) => {
        if (jobOrder.parcel) {
          $scope.form = jobOrder.parcel;
        } else {
          $location.path('/job-orders');
        }
      });
  }

  $scope.search = (search) => {
    $scope.tableParams.filter({id: search.query, name: search.query, 'customers.name': search.query});
  };

  $scope.save = () => {
    var request = null;
    if ($scope.form.id) {
      request = Loading.followR(JobOrders.update({id: $scope.form.id}, $scope.form))
    } else {
      request = Loading.followR(JobOrders.save($scope.form))
    }

    request.then(() => {
      $location.path('/job-orders')
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
    )($scope.form.jobs);
  };

  $scope.remove = (item) => {
    Modals
      .confirm("Você deseja realmente remover essa ordem de serviço?")
      .then(function () {
        Loading.followR(JobOrders.delete({id: item.id})).then(() => {
          $scope.tableParams.reload();
        });
      });
  };

  $scope.getEditUrl = (jobOrder) => {
    return `#/job-orders/edit/${jobOrder.id}`;
  };

  $scope.getStatusClass = (status) => {
    switch(status) {
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
    switch(status) {
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
    Loading.followP($http.post(`job-orders/set-status/${item.id}`, { status })).then(_ => item.status = status);
  }


};