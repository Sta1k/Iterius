APP
  .controller('TeamCtrl', function ($scope, $state, $cordovaToast, APIService, showTeam,dataService, $stateParams) {
    $scope.timeCount = dataService.AllWorkedTime;
    $scope.showTeam = function (team) {
      $cordovaToast.showShortTop('Loading...');
      dataService.currentTeam=team;
      $state.go('app.curteam/:teamId',{teamId: team.title},{reload:true});
    };

    APIService.teamStatus()
      .success(function (res) {
        console.log(res);
        $scope.Global = dataService.Global=res
      })
      .error(function (res) {
        console.log("ERROR");
        console.log(res)

      })

  });
