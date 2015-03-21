/**
 * Created by ТАНЯ on 20.03.15.
 */
var app = angular.module('Pets', ['ngRoute' , 'ngDialog', 'ngMessages']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode({
    enabled:     true,
    requireBase: false
  });

  $routeProvider
    .when('/', {
        templateUrl: '/front/components/entities/pets/list/view.html',
        controller: "PetsListCtrl"
    })
    .when('/pets', {
      templateUrl: '/front/components/entities/pets/list/view.html',
      controller: "PetsListCtrl"
    })
    .when('/pets/detail/:id', {
      templateUrl: '/front/components/entities/pets/detail/view.html',
      controller: "PetDetailCtrl"
    })
    .when('/pets/add', {
      templateUrl: '/front/components/entities/pets/add/view.html',
      controller: "AddPetCtrl"
    })
    .otherwise({redirectTo: '/'});

}]);