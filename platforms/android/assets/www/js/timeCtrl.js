APP
  .controller('timeCtrl', function ($scope,dataService, $interval,$stateParams) {
    
      $scope.$watch(function(){
        return dataService.AllWorkedTime
      }, function (newVal, oldVal, scope) {
          if(newVal) {
            $scope.timeCount = newVal;
            
          }
        });
      
      
      // $interval(function () {
      //   $scope.timeCount = dataService.AllWorkedTime;
      //   // console.log(typeof $scope.timeCount)
      // }, 1000);
    
  });
