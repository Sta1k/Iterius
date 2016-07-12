APP
  .controller('timeCtrl', function ($scope,dataService, $interval,$stateParams) {
    
      $scope.$watch(dataService.AllWorkedTime, function (newVal, oldVal, scope) {
        if(newVal) {
          $scope.timeCount = newVal;
          console.log($scope.timeCount)
        }
      });
      
      // $interval(function () {
      //   $scope.timeCount = dataService.AllWorkedTime;
      //   // console.log(typeof $scope.timeCount)
      // }, 1000);
    
  });
