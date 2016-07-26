APP
  .controller('EditCtrl', function ($scope, $state, $cordovaToast, $ionicNavBarDelegate, dataService, APIService, $stateParams) {
    console.log('editCtrl');
    $ionicNavBarDelegate.showBackButton(false);
    $scope.task = dataService.editingTask;
    $scope.timeCount = dataService.AllWorkedTime;
    $scope.title='Edit Task';
    $scope.button='Edit';
    $scope.clearForm = function () {
      $scope.task = {};
    };
    $scope.createT = function () {
      console.log($scope.task);
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

      // $scope.taskCreated=function () {
      //   $state.go('app.tasks',{},{reload:true});
      // }
    };
  });
