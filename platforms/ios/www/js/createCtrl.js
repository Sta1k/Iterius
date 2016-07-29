APP
  .controller('CreateCtrl', function ($scope, $state, $cordovaToast,data, $ionicNavBarDelegate, dataService, APIService, $stateParams) {
    console.log('createCtrl');
    $ionicNavBarDelegate.showBackButton(false);
    $scope.task = {
      associated: '',
      assigned: '',
      title: '',
      desc: ''
    };
    $scope.button='Create';
    $scope.title='Create Task';
    $scope.timeCount = dataService.AllWorkedTime;
    if(data.user.role==1){
      $scope.currentTeam = dataService.currentTeam.users;
    }
    if(data.user.role==2){
      $scope.currentTeam = dataService.Global.all;
    }
    console.log($scope.currentTeam);
    $scope.createT = function () {
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
                $cordovaToast.show('Task created', 'short', 'top')
              }
            })
            .then(function (success) {
              $cordovaToast.showShortTop('Please wait...');
              $state.go('app.tasks', {}, {reload: true});
            })
        });

      // $scope.taskCreated=function () {
      //   $state.go('app.tasks',{},{reload:true});
      // }
    };
    $scope.clearForm = function () {
      $scope.task = {};
    }
  });
