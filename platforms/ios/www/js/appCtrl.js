APP
  .controller('AppCtrl', function ($scope,$state,$stateParams, APIService) {
    $scope.logout = function () {
      APIService.logout().then(
        function(res){
          console.log(res);
          $state.go('login',{},{reload:true})
      })
    }
  });
