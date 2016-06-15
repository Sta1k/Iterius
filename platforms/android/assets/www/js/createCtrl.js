APP
  .controller('CreateCtrl', function ($scope, Notification, dataService, APIService, $stateParams) {
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
        Notification.showAlert('Task created').then(function(res) {
            $state.go('app.tasks');
        })
    })
  }
});
