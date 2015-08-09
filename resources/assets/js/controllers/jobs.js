var { toolbarItem } = require('../helpers/page');
var R = require('ramda');


/**
 * Controller de Serviços
 * @module controllers
 * @ngInject
 */
module.exports = function JobsController($scope, $rootScope, $q, $location, $routeParams, ngTableParams, Jobs, Loading, Modals) {
  $scope.form = {};

  $scope.toolbarItems = [
    toolbarItem("list", null, "view-list", "/jobs"),
    toolbarItem("new", null, "plus", "/jobs/new")
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
      Jobs.get(params.url(), (result) => {
        params.total(result.parcel.total);
        $defer.resolve(result.parcel.result);
      });
    }
  });

  var job = null;

  if ($routeParams.id) {
    Loading.followR(Jobs.get({id: $routeParams.id}))
      .then((job) => {
        if (job.parcel) {
          $scope.form = job.parcel;
        } else {
          $location.path('/jobs');
        }
      });
  }

  $scope.search = (search) => {
    $scope.tableParams.filter({id: search.query, name: search.query, cnpj: search.query});
  };

  $scope.save = () => {
    var request = null;
    if ($scope.form.id) {
      request = Loading.followR(Jobs.update({id: $scope.form.id}, $scope.form))
    } else {
      request = Loading.followR(Jobs.save($scope.form))
    }

    request.then(() => {
      $location.path('/jobs')
    });

  };

  $scope.remove = (item) => {
    Modals
      .confirm("Você deseja realmente remover esse cliente?")
      .then(function () {
        Loading.followR(Jobs.delete({id: item.id})).then(() => {
          $scope.tableParams.reload();
        });
      });
  };

  $scope.getEditUrl = (job) => {
    return `#/jobs/edit/${job.id}`;
  }


};