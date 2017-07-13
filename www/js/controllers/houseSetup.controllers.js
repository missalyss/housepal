angular.module('app.houseSetup.controllers', [])

  .controller('houseSetupCtrl', ['$scope', '$stateParams', '$state', '$http', 'AuthService', function($scope, $stateParams, $state, $http, AuthService) {

      $scope.$on('$ionicView.enter', function(e) {
        console.log('on init');
        $scope.hideIntro = true
      });

      $scope.joinButton = function() {
        $scope.showJoinContainer = true
        $scope.hideIntro = false
      }

      $scope.createButton = function() {
        $scope.showCreateContainer = true
        $scope.hideIntro = false
      }

      $scope.joinFormSubmit = function (joinFormData) {
        $http.post('http://localhost:9000/houses/join', joinFormData).then(result => {
          AuthService.storeUserCredentials(result.data.newToken);
          $state.go('tabsController.messageBoard')
        }).catch(err => {
          console.log(err);
          console.log(err.status, err.data.msg, err.data.err);
          $scope.joinError = {text: 'try again, house doesnt exist', msg: err.data.msg, err: err.data.err.detail}
        })
      }

      $scope.createFormSubmit = function (createFormData) {
        $http.post('http://localhost:9000/houses/create', createFormData).then(result => {
          AuthService.storeUserCredentials(result.data.newToken);
          $state.go('tabsController.messageBoard')
        }).catch(err => {
          $scope.createError = {text: 'try again, house already exists', msg: err.data.msg, err: err.data.err.detail}
        })
      }

  }])