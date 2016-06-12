APP
  .controller('CreateCtrl', function ($scope,showTop, dataService, APIService, $stateParams) {
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
        showTop('Task created')
    })
  }
});
