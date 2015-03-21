app.controller('PetsListCtrl', ['$scope', '$http', '$route', function($scope, $http, $route) {

  $http.get('/api/pets').success(function(data, options) {
    $scope.petsList = data;
  });

  $scope.deletePet = function (id) {
    $http.delete('/api/pets/'+id).success(function(data, options) {
      $route.reload();
    });
  }
}]);