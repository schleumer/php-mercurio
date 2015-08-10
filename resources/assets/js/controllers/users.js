var { toolbarItem } = require('../helpers/page');
var R = require('ramda');

/**
 * Controller para manutenção de Usuarios
 * @module controllers
 * @type {*[]}
 * @ngInject
 */
module.exports = function UsersController($scope, $rootScope, $q, $location, $routeParams, ngTableParams, Users, Loading, Modals) {
  $scope.form = {};

  $scope.toolbarItems = [
    toolbarItem("list", null, "view-list", "/users"),
    toolbarItem("new", null, "plus", "/users/new")
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
      Users.get(params.url(), (result) => {
        params.total(result.parcel.total);
        $defer.resolve(result.parcel.result);
      });
    }
  });

  var user = null;

  if ($routeParams.id) {
    Loading.followR(Users.get({id: $routeParams.id}))
      .then((res) => {
        if (res.parcel) {
          $scope.form = res.parcel;
        } else {
          $location.path('/users');
        }
      });
  }

  $scope.search = (search) => {
    $scope.tableParams.filter({id: search.query, name: search.query});
  };

  $scope.save = () => {
    var request = null;
    if ($scope.form.id) {
      request = Loading.followR(Users.update({id: $scope.form.id}, $scope.form))
    } else {
      request = Loading.followR(Users.save($scope.form))
    }

    request.then(() => {
      $location.path('/users')
    });

  };

  $scope.remove = (item) => {
    Modals
      .confirm("Você deseja realmente remover esse serviço?")
      .then(function () {
        Loading.followR(Users.delete({id: item.id})).then(() => {
          $scope.tableParams.reload();
        });
      });
  };

  $scope.getEditUrl = (user) => {
    return `#/users/edit/${user.id}`;
  }


};