APP
  .controller('curTeamCtrl', function ($scope, $state,$translate, $cordovaToast, APIService, showTeam, dataService, $stateParams) {
    $scope.timeCount = dataService.AllWorkedTime;
    $scope.currentTeam = dataService.currentTeam = _.findWhere(dataService.Global, {title: $stateParams.teamId});
    console.log($scope.currentTeam);
    $translate('please_wait').then(function (result) {
      $scope.mes2 = result;
    });
    $scope.showUser = function (user) {
      $cordovaToast.showShortTop($scope.mes2);

      $state.go('app.userTasks/:id', {id: user.id}, {reload: true})
        

    };
    $scope.bac=function () {
      $state.go('app.team',{},{reload:true});
    }
  });
