app.controller('PetDetailCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {

  var petDetail = {};
  $http.get('/api/pets/id/' + $routeParams.id).success(function(data) {
    $scope.pet = angular.copy(data);
    petDetail  = angular.copy(data);
  });

  $scope.cancel = function () {
    $scope.pet = angular.copy(petDetail);
  };

  $scope.updatePetDetail = function () {

    var data = {
      name:    $scope.pet.name,
      owner:   $scope.pet.owner,
      age:     $scope.pet.age,
      species: $scope.pet.species
    };

    $http.put('/api/pets/' + $routeParams.id, JSON.stringify(data)).success(function(data) {
      console.log(data);
    });

  }

}]);