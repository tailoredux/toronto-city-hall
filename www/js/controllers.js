angular.module('hall.controllers', [])
.controller('AppCtrl', function($scope, $rootScope, $state, $mdSidenav){
  function buildToggler(navID) {
    return function() {
      return $mdSidenav(navID).toggle()
        .then(function () {
          console.log('done');
        });
    }
  }
  $scope.toggleMenu = buildToggler('menu'); 
  $scope.go = function(destination){
    $state.go(destination);
  }
  $scope.back = function(){
    $state.go($rootScope.previousState);
  }
  $rootScope.previousState;
  $rootScope.currentState;
  $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
      $rootScope.previousState = from;
      $rootScope.currentState = to;
      //console.log('Previous state:'+$rootScope.previousState)
      //console.log('Current state:'+$rootScope.currentState)
  });
})
.controller('MotionsCtrl', function($scope, $state, Motions) {
  Motions.all().then(function(data){
    $scope.motions = data;
  });
})
.controller('CouncillorsCtrl', function($scope, $state, apiUrl, Council) {
  $scope.apiUrl = apiUrl;
  Council.all().then(function(data){
    $scope.council = data;
  });
})
.controller('WardsCtrl', function($scope, $state, apiUrl, Wards) {
  //$scope.apiUrl = apiUrl;
  Wards.all().then(function(data){
    console.log(data);
    $scope.wards = data;
  });
})
.controller('CouncillorCtrl', function($scope, $state, apiUrl, $stateParams) {
  /*$scope.apiUrl = apiUrl;
  Council.all().then(function(data){
    $scope.council = data;
  });*/
  $scope.params = $stateParams;
  $scope.councillor = $stateParams.councillor;
})
.controller('MenuCtrl', function ($scope, $state, $mdSidenav) {
  $scope.go = function(destination){
    $mdSidenav('menu').close();
    $state.go(destination);
  }
  $scope.close = function () {
    $mdSidenav('menu').close();
  };
});
