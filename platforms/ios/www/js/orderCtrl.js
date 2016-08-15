APP
  .controller('OrderCtrl',
    function ($scope,$state, $stateParams,$translate, APIService, $cordovaToast, dataService, updateOneTime, $interval) {
      //$scope.orderId = $stateParams.orderId;
      $scope.currentTask =_.findWhere(dataService.tasksList, {id: $stateParams.orderId});
      var unbindWatch;
      console.log($scope.currentTask);
      if ($scope.currentTask.current == true) {
        unbindWatch = $scope.$watch(function () {
          return dataService.currentTask.time;
        }, function (newVal, oldVal, scope) {
          if (newVal && $scope.currentTask.id === dataService.currentTask.id) {
            $scope.currentTask.time = newVal;

          }
        })
      }
      if (unbindWatch) {
        unbindWatch();
      }

      var unbindTimeWatcher = $scope.$watch(
        function () {
          return dataService.AllWorkedTime
        },
        function (newVal) {
          if (newVal) {
            $scope.timeCount = newVal;
            unbindTimeWatcher();
          }
        }
      );
      $translate('task_start').then(function (result) {
        $scope.mes = result;
      });
      $translate('task_stop').then(function (result) {
        $scope.mes2 = result;
      });
      $translate('server_error').then(function (result) {
        $scope.err1 = result;
      });
      $scope.toggleT = function (task) {
        $scope.busy=true;
        dataService.currentTask = task;
        APIService.toggleState(task.id)
          .then(function success(resp) {
            dataService.showTime = true;
            console.log(resp);
            if (resp.data.started === false && resp.data.success === true) {
              $cordovaToast.showShortBottom($scope.mes2);
              $scope.busy=false;
              dataService.showTime = false;
              updateOneTime.StopTimer(task);
              // stopInterval();
              // dataService.currentTask = $scope.currentTask;
              APIService.requestTasks()
                .then(function success(res) {
                  if (!res.data.success) {
                    $cordovaToast.showShortTop($scope.err1);
                  } else {
                    console.log(res);
                    dataService.tasksList = res.data.tasks;
                    $scope.tasksList = dataService.tasksList;
                    // stopInterval();
                    var obj = _.findWhere(dataService.tasksList, {id: task.id});
                    $scope.currentTask = obj;
                  }

                });

              console.log(resp.data.started);
            } else if (resp.data.started === true && resp.data.success === true) {
              // stop timer
              $cordovaToast.showShortBottom($scope.mes);
              $scope.currentTask.current = true;
              $scope.busy=false;
              // dataService.currentTask = $scope.currentTask;
              console.log(resp.data.started);
            }
            APIService.requestTasks()
              .then(function success(res) {
                if (!res.data.success) {
                  $cordovaToast.showShortTop($scope.err1);
                } else {
                  console.log(res);
                  dataService.tasksList = res.data.tasks;


                }

              }).then(function () {
              $scope.tasksList = dataService.tasksList;

              var obj = _.findWhere(dataService.tasksList, {id: task.id});
              console.log(obj);
              if (obj == undefined) {
                return false
              }
              else if (obj.current == true) {
                updateOneTime.StopTimer(obj);
                dataService.showTime = true;
                updateOneTime.StartTimer(obj);
                // orderTimer();

              }
              else if (obj.current == false) {
                dataService.showTime = true;
                updateOneTime.StopTimer(obj);
                // stopInterval();
              }
            })
          })
      };
      $scope.bacu=function () {
        console.log('swipe-right');
        $state.go('app.tasks',{},{reload:true});
      }
    });
