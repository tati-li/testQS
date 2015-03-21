app.controller('AddPetCtrl', ['$scope', '$routeParams', '$http', 'ngDialog', '$location', '$route', function($scope, $routeParams, $http, ngDialog, $location, $route) {

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
          var dialog = ngDialog.open({
            template:  '/front/components/core/modal/view.html',
            controller: ['$scope', '$sce', function($scope, $sce) {
              $scope.message = $sce.trustAsHtml('Add <span class="nameTxt">' + data.name + '</span> successfully!');
            }],
            className: 'ngdialog-theme-plain'
          });

          dialog.closePromise.then(function () {
             $route.reload();
          });

        }).
        error(function(data, status, headers, config) {
        });
    }
  }
}]);