APP
  .controller('CreateCtrl', function ($scope, $state, Notification, dataService, APIService, $stateParams) {
  console.log('createCtrl');
    
  $scope.task={
    title:'',
    desc: ''
  };
  $scope.timeCount = dataService.AllWorkedTime;
  $scope.createT = function () {
    APIService.TaskCreate($scope.task)
      .then(function (res) {
      console.log(res);
        Notification.showAlert('Task created')
    }).then(function () {
      $state.go('app.tasks',{},{reload:true});
    })
  }
});
