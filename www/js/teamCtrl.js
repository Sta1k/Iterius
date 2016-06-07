APP
  .controller('TeamCtrl', function ($scope, $state, APIService, showTeam,dataService, $stateParams) {
    $scope.timeCount = dataService.AllWorkedTime;
    $scope.showTeam = function (team) {
      dataService.currentTeam=team;
      $state.go('app.curteam');
    };
    // $scope.swipeLeft = function () {
    //   console.log('SWIPED')
    // };
    APIService.teamStatus()
      .success(function (res) {
        console.log(res);
        $scope.Global = res
      });

  });
