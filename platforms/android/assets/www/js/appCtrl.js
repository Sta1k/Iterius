APP
  .controller('AppCtrl', function ($scope, $state, $stateParams, APIService) {
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
          $state.go('login', {}, {reload: true})
        })
    }
  });
