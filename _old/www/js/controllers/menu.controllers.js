angular.module('app.menu.controllers', [])

  .controller('menuCtrl', ['$scope', '$state', '$stateParams', '$http', 'AuthService', '$ionicSideMenuDelegate', function($scope, $state, $stateParams, $http, AuthService, $ionicSideMenuDelegate) {

    $scope.goToHouseSettings = function () {
      $ionicSideMenuDelegate.toggleLeft(false);
      $state.go('tabsController.houseSettings');
    }

    $scope.test = function () {
      let test = {token: 'lol'}
      $http.put('http://localhost:9000/users/updateDeviceToken', test).then((result) => {
        console.log('updated user, back in controller');
        console.log(result);
      }).catch(err =>{
        console.log(err);
      })
    }

    // $scope.destroySession = function() {
    //   AuthService.logout();
    // };
    //
    // $scope.getInfo = function() {
    //   $http.get('http://localhost:9000/memberinfo').then(function(result) {
    //     $scope.memberinfo = result.data;
    //   });
    // };
    //
    // $scope.deltest = function() {
    //   $http.get('http://localhost:9000/deleteHouse').then(function(result) {
    //     $scope.memberinfo = 'deleted house 1';
    //   });
    // };

    $scope.logout = function() {
      AuthService.logout();
      $ionicSideMenuDelegate.toggleLeft(false);
      $state.go('login');
    };

  }])