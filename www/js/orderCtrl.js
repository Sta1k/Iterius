APP
  .controller('OrderCtrl',
    function ($scope,  $stateParams, APIService, dataService,updateOneTime, $interval) {
      console.log(dataService.currentTask);
      $scope.currentTask = dataService.currentTask;
      var orderInterval;
      function orderTimer(){
          orderInterval=$interval(order, 1000)
      }
     function order (){
            $scope.tasksList = dataService.tasksList;
            $scope.timeCount = dataService.AllWorkedTime;
            $scope.currentTask.time=dataService.currentTask.time;
            console.log($scope.currentTask.time);
     }
      function stopInterval() {
            $interval.cancel(orderInterval);
        }
      $scope.checkStarted = function () {
        var obj = $scope.currentTask;
        if (obj == undefined) {
          return false
        }
        else if (obj.current == true) {
          dataService.showTime = true;
          updateOneTime.StartTimer(obj);
          orderTimer();
        }
        // console.log(obj)
      };
      $scope.checkStarted();
      $scope.toggleT = function (task) {
        APIService.toggleState(task.id)
          .then(function success(resp) {
            console.log(resp);
            if (resp.data.started === false && resp.data.success === true) {

              // start timer
              dataService.showTime = false;
              updateOneTime.StopTimer(task);
              stopInterval();
              // dataService.currentTask = $scope.currentTask;
              APIService.requestTasks()
                .then(function success(res) {
                  if (!res.data.success) {
                    alert(res.data.error);
                  } else {
                    console.log(res);
                    dataService.tasksList = res.data.tasks;
                    $scope.tasksList = dataService.tasksList;
                    stopInterval();
                    var obj = _.findWhere(dataService.tasksList, {id: task.id});
                    $scope.currentTask = obj;
                  }

                });

              console.log(resp.data.started);
            } else if (resp.data.started === true && resp.data.success === true) {
              // stop timer
              
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
                dataService.showTime = true;
                updateOneTime.StartTimer(obj);
                orderTimer();

              }
              else if(obj.current == false){
                dataService.showTime = true;
                updateOneTime.StopTimer(obj);
              stopInterval();
              }
            })
          })
      }
    });
