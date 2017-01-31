APP
  .controller('TeamCtrl', function ($scope, $state,$timeout, $cordovaToast, APIService, showTeam,dataService,data, $stateParams) {
    $scope.timeCount = dataService.AllWorkedTime;
    $timeout(navigator.splashscreen.hide(),2000);
    $scope.showTeam = function (team) {
      //$cordovaToast.showShortTop('Loading...');
      dataService.currentTeam=team;
      $state.go('app.curteam/:teamId',{teamId: team.title},{reload:true});
    };


    APIService.teamStatus()
      .success(function (res) {
        console.log(res);
        if(!res.success){
          dataService.Global=res;
          $scope.Global = _.filter(_.toArray(dataService.Global), function (obj) {
            return !_.isArray(obj)
          });

        }
        if(res.success==false){
          $cordovaToast.showShortTop(res.error);
          $state.go('splash',{},{reload:true})
        }

      })
      .error(function (res) {
        console.log("ERROR", res);


      });
    $scope.tasks = function () {
      $state.go('app.tasks', {}, {reload: true});
    };

  });
