APP
  .controller('AppCtrl', function ($scope, $state, $stateParams, $cordovaVibration,APIService) {
    //$scope.role = data.user.role;

    // $scope.$watch(function () {
    //   return data.user.role
    // }, function (newValue) {
    //   $scope.role = newValue
    // }, true);

    $scope.logout = function () {
      APIService.logout().then(
        function (res) {
          console.log(res);
          $cordovaVibration.vibrate(50);
          $state.go('login', {}, {reload: true})
        })
    };
    $scope.tasks = function () {
      APIService.requestTasks().then(
        function (res) {
          console.log(res);
          $state.go('app.tasks', {}, {reload: true})
        })
    }

  });
