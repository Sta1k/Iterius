APP
  .controller('CreateCtrl', function ($scope, $state,$translate, $cordovaToast,data, $ionicNavBarDelegate, dataService, APIService, $stateParams) {
    console.log('createCtrl');
    $ionicNavBarDelegate.showBackButton(false);
    $scope.task = {
      associated: 0,
      assigned: '',
      title: '',
      desc: ''
    };
    $translate('create_button').then(function (result) {
      $scope.button = result;
    });
    $translate('create_head').then(function (result) {
      $scope.title = result;
    });
    $translate('create_mes').then(function (result) {
      $scope.mes = result;
    });
    $translate('please_wait').then(function (result) {
      $scope.mes2 = result;
    });
    $translate('server_error').then(function (result) {
      $scope.err1 = result;
    });
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
                $cordovaToast.showShortTop($scope.err1)

              } else {
                dataService.tasksList = res.data.tasks;
                $cordovaToast.show($scope.mes, 'short', 'top')
              }
            })
            .then(function (success) {
              $cordovaToast.showShortTop($scope.mes2);
              $state.go('app.tasks', {}, {reload: true});
            })
        });

      // $scope.taskCreated=function () {
      //   $state.go('app.tasks',{},{reload:true});
      // }
    };
    $scope.clearForm = function () {
      $scope.task = {};
    };
    $scope.tasks = function () {
      $state.go('app.tasks', {}, {reload: true});
    };
  });
