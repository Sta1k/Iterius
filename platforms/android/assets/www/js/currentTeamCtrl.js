APP
  .controller('curTeamCtrl', function ($scope, $state, $cordovaToast, APIService, showTeam, dataService, $stateParams) {
    $scope.timeCount = dataService.AllWorkedTime;
    $scope.currentTeam = dataService.currentTeam = _.findWhere(dataService.Global, {title: $stateParams.teamId});
    console.log($scope.currentTeam);
    $scope.showUser = function (user) {
      $cordovaToast.showShortTop('Loading...');

      $state.go('app.userTasks/:id', {id: user.id}, {reload: true})
        

    };
  });
