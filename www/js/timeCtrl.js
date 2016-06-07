APP
  .controller('timeCtrl', function ($scope,dataService, $interval,$stateParams) {
    if (dataService.showTime === true) {
      $interval(function () {
        $scope.timeCount = dataService.AllWorkedTime;
        // console.log(typeof $scope.timeCount)
      }, 1000);
    }
  });
