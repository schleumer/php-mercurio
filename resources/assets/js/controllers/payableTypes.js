var { toolbarItem } = require('../helpers/page');
var R = require('ramda');


/**
 * Controller de Tipos de Pagamento
 * @module controllers
 */
module.exports = /*@ngInject*/ function PayableTypesController($scope, $rootScope, $q, $location, $routeParams, ngTableParams, PayableTypes, Loading, Modals) {
  $scope.form = {};

  $scope.toolbarItems = [
    toolbarItem("list", null, "view-list", "/payable-types"),
    toolbarItem("new", null, "plus", "/payable-types/new")
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
      PayableTypes.get(params.url(), (result) => {
        params.total(result.parcel.total);
      $defer.resolve(result.parcel.result);
    });
}
});

var payableType = null;

if ($routeParams.id) {
  Loading.followR(PayableTypes.get({id: $routeParams.id}))
    .then((payableType) => {
    if (payableType.parcel) {
    $scope.form = payableType.parcel;
  } else {
    $location.path('/payable-types');
  }
});
}

$scope.search = (search) => {
  $scope.tableParams.filter({id: search.query, name: search.query});
};

$scope.save = () => {
  var request = null;
  if ($scope.form.id) {
    request = Loading.followR(PayableTypes.update({id: $scope.form.id}, $scope.form))
  } else {
    request = Loading.followR(PayableTypes.save($scope.form))
  }

  request.then(() => {
    $location.path('/payable-types')
});

};

$scope.remove = (item) => {
  Modals
    .confirm("Você deseja realmente remover esse tipo de pagamento?")
    .then(function () {
      Loading.followR(PayableTypes.delete({id: item.id})).then(() => {
        $scope.tableParams.reload();
    });
});
};

$scope.getEditUrl = (payableType) => {
  return `#/payable-types/edit/${payableType.id}`;
}


};