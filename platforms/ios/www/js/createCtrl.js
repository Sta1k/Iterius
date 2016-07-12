APP
  .controller('CreateCtrl', function ($scope, $state, $cordovaToast, dataService, APIService, $stateParams) {
  console.log('createCtrl');

  $scope.task={
    associated:'',
    assigned:'',
    title:'',
    desc: ''
  };
  $scope.timeCount = dataService.AllWorkedTime;
  $scope.createT = function () {
    APIService.TaskCreate($scope.task)
      .then(function (res) {
      console.log(res);
        $cordovaToast.show('Task created','short','top')
          .then(function (success) {
          $state.go('app.tasks',{},{reload:true});
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
