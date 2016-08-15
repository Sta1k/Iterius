APP
  .controller('EditCtrl', function ($scope, $state,$translate, $cordovaToast,data, $ionicNavBarDelegate, dataService, APIService, $stateParams) {
    console.log('editCtrl');
    $ionicNavBarDelegate.showBackButton(false);
    $scope.task = dataService.editingTask;
    $scope.timeCount = dataService.AllWorkedTime;
    $translate('edit_button').then(function (result) {
      $scope.button = result;
    });
    $translate('edit_task').then(function (result) {
      $scope.title = result;
    });
    $translate('task_edited').then(function (result) {
      $scope.mes = result;
    });
    $translate('server_error').then(function (result) {
      $scope.err1 = result;
    });
    $scope.clearForm = function () {
      $scope.task = {};
    };
    if(data.user.role==1){
      $scope.currentTeam = dataService.currentTeam.users;

    }
    if(data.user.role==2){
      $scope.currentTeam = dataService.Global.all;
    }
    //console.log(dataService.Global.all);
    $scope.createT = function () {
      console.log(dataService.Global);
      APIService.TaskCreate($scope.task)
        .then(function (res) {
          APIService.requestTasks()
            .then(function success(res) {
              $scope.busy = true;
              if (!res.data.success) {
                $scope.busy = false;
                $cordovaToast.showShortTop($scope.err1)

              } else {
                dataService.tasksList = res.data.tasks;
                $cordovaToast.show($scope.mes, 'short', 'top')
              }
            })
            .then(function (success) {

              $state.go('app.tasks', {}, {reload: true});
            })
        });


    };
  });
