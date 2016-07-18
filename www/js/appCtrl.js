APP
  .controller('AppCtrl', function ($scope, $state, $stateParams, $cordovaVibration,APIService) {
    //$scope.role = data.user.role;

    // $scope.$watch(function () {
    //   return data.user.role
    // }, function (newValue) {
    //   $scope.role = newValue
    // }, true);
    $scope.tasks = function () {
      APIService.requestTasks().then(
        function (res) {
          console.log(res);
          $state.go('app.tasks', {}, {reload: true})
        })
    };
    $scope.team = function () {
      $state.go('app.team',{},{reload:true})
    };
    $scope.createTask = function () {
      $state.go('app.create',{},{reload:true})
    };
    $scope.pref = function () {
      $state.go('app.pref',{},{reload:true})
    };
    $scope.logout = function () {
      APIService.logout().then(
        function (res) {
          console.log(res);
          $cordovaVibration.vibrate(50);
          $state.go('login', {}, {reload: true})
        })
    };
    
    
    
  });
