APP
  .controller('OrderCtrl',
  ['$scope',
    'dataService',
    '$filter',
    'APIService',
    '$state',
    '$interval',
    '$stateParams',

    function ($scope, timing, $stateParams, APIService, dataService, $interval) {
      console.log('orderCtrl');
      $scope.currentTask = dataService.currentTask;
      console.log('TASK---'+dataService.currentTask);
      // if ($scope.currentTask.current === true) {
      //   $scope.StartTimer($scope.currentTask.time)
      // }else{
      //   return false
      // }
      $scope.toggleT = function (task) {
        APIService.toggleState(task.id)
          .then(function success(resp) {
            console.log(resp);
            if (resp.data.started === false && resp.data.success === true) {

              // start timer
              $scope.currentTask.current = false;
              $scope.StopTimer(task.time);
              dataService.currentTask = $scope.currentTask;

              console.log(resp.data.started);
            } else if (resp.data.started === true && resp.data.success === true) {
              // stop timer
              $scope.StartTimer(task.time);
              $scope.currentTask.current = true;

              dataService.currentTask = $scope.currentTask;
              console.log(resp.data.started);
            }
            APIService.requestTasks()
              .then(function success(res) {
                if (!res.data.success) {
                  alert(res.data.error);
                } else {
                  console.log(res);
                  $scope.tasksList = res.data.tasks;


                }

              })
          })
      }
    }]);
