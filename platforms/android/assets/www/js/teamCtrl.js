APP
  .controller('TeamCtrl', function ($scope, $state,$timeout, $cordovaToast, APIService, showTeam,dataService, $stateParams) {
    $scope.timeCount = dataService.AllWorkedTime;
    $scope.showTeam = function (team) {
      //$cordovaToast.showShortTop('Loading...');
      dataService.currentTeam=team;
      $state.go('app.curteam/:teamId',{teamId: team.title},{reload:true});
    };
    $timeout(navigator.splashscreen.hide(),2000);
    APIService.teamStatus()
      .success(function (res) {
        console.log(res);
        if(!res.success){
          dataService.Global=res;
          $scope.Global = _.filter(_.toArray(dataService.Global), function (obj) {
            return !_.isArray(obj)
          });
          console.log($scope.Global)
        }
        if(res.success==false){
          $cordovaToast.showShortTop(res.error);
        }
      })
      .error(function (res) {
        console.log("ERROR");
        console.log(res)

      })

  });
