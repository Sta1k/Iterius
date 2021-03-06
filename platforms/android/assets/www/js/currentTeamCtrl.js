APP
  .controller('curTeamCtrl', function ($scope, $state, $translate, $cordovaToast, APIService, showTeam, dataService, $stateParams) {
    $scope.timeCount = dataService.AllWorkedTime;
    
    console.log($scope.currentTeam);
    $translate('please_wait').then(function (result) {
      $scope.mes2 = result;
    });
    $scope.showUser = function (user) {
      $cordovaToast.showShortTop($scope.mes2);

      $state.go('app.userTasks/:id', {id: user.id}, {reload: true})


    };
    APIService.teamStatus()
      .success(function (res) {
        if (!res.success) {
          dataService.Global = res;
          $scope.Global = _.filter(_.toArray(dataService.Global), function (obj) {
            return !_.isArray(obj)
          });
          $scope.currentTeam = dataService.currentTeam = _.findWhere(dataService.Global, {title: $stateParams.teamId});
        }
        if (res.success == false) {
          $cordovaToast.showShortTop(res.error);
          $state.go('splash', {}, {reload: true})
        }
      })
      .error(function (res) {
        console.log("ERROR", res);
      });
    $scope.bac = function () {
      $state.go('app.team', {}, {reload: true});
    };
    $scope.tasks = function () {
      $state.go('app.tasks', {}, {reload: true});
    };
  });
