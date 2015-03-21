app.controller('AddPetCtrl', ['$scope', '$routeParams', '$http', 'ngDialog', function($scope, $routeParams, $http, ngDialog) {

  $scope.pet = {
    age:      null,
    name:     '',
    owner:    '',
    species:  ''
  };

  $scope.addNewPet = function (e) {

    console.log($scope.AddPetForm);

    if ($scope.AddPetForm.$valid) {
      $http.post('/api/pets', JSON.stringify($scope.pet)).
        success(function(data, status, headers, config) {
              ngDialog.open({
                template:  '/front/components/core/modal/view.html',
                controller: ['$scope', function($scope) {
                  $scope.name = data.name;
                }],
                className: 'ngdialog-theme-plain'
              });
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    }
  }
}]);