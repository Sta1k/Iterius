APP
  .controller('EditCtrl', function ($scope, $state, $cordovaToast,data, $ionicNavBarDelegate, dataService, APIService, $stateParams) {
    console.log('editCtrl');
    $ionicNavBarDelegate.showBackButton(false);
    $scope.task = dataService.editingTask;
    $scope.timeCount = dataService.AllWorkedTime;
    $scope.title = 'Edit Task';
    $scope.button = 'Edit';
    $scope.clearForm = function () {
      $scope.task = {};
    };
    if(data.user.role==1){
      $scope.currentTeam = dataService.currentTeam.users;

    }
    if(data.user.role==2){
      $scope.currentTeam = dataService.Global.all;
    }
    console.log(dataService.Global.all)
    $scope.createT = function () {
      console.log(dataService.Global);
      APIService.TaskCreate($scope.task)
        .then(function (res) {
          APIService.requestTasks()
            .then(function success(res) {
              $scope.busy = true;
              if (!res.data.success) {
                $scope.busy = false;
                alert(res.data.error);

              } else {
                dataService.tasksList = res.data.tasks;
                $cordovaToast.show('Task edited', 'short', 'top')
              }
            })
            .then(function (success) {

              $state.go('app.tasks', {}, {reload: true});
            })
        });


    };
  });
