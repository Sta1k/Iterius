APP
  .controller('curTeamCtrl', function ($scope,$state, APIService, showTeam,dataService, $stateParams) {
    $scope.timeCount = dataService.AllWorkedTime;
    $scope.currentTeam = dataService.currentTeam;
    console.log($scope.currentTeam);
    $scope.showUser = function (user) {
      dataService.currentUser=user;
      $state.go('app.userTasks');
    };
    // $scope.swipeLeft = function () {
    //   console.log('SWIPED')
    // };
    // APIService.teamStatus()
    //   .success(function (res) {
    //     console.log(res);
    //     $scope.Global = res
    //   });

  });
