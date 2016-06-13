APP
  .controller('PrefCtrl', function ($scope,dataService, $interval,$stateParams) {
    console.log('PrefCtrl');
    $scope.buttonON = function () {
      $scope.obj=dataService.login;
      console.log($scope.obj);
      
      dataService.writeDB($scope.obj)
    };
    $scope.buttonOff = function () {
       dataService.readDb()
    }
  });
