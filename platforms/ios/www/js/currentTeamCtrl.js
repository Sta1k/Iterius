APP
  .controller('curTeamCtrl', function ($scope,$state, APIService, showTeam,dataService, $stateParams) {
    $scope.timeCount = dataService.AllWorkedTime;
    $scope.currentTeam = dataService.currentTeam;
    console.log($scope.currentTeam);
    $scope.showUser = function (user) {
      APIService.requestUserTasks(user.id)
        .success(function (res) {
          
          dataService.memberTasks=res.tasks;
          console.log(dataService.memberTasks)
          dataService.currentUser=user;
        })
        .finally(function () {
          $state.go('app.userTasks',{},{reload:true})
        });
      
    };
  });
