/**
 * Created by smissltd on 07.06.16.
 */
APP.controller('TasksCtrl',
  ['$scope',
    'dataService',
    'updateTaskTime',
    '$filter',
    'APIService',
    '$state',
    '$interval',
    '$stateParams',
    function ($scope,
              dataService,
              updateTaskTime,
              $filter,
              APIService,
              $state,
              $interval,
              $stateParams) {
      console.log('tasksCtrl');
      $scope.tasksList = dataService.tasksList;//взяли из сервиса

      $scope.checkStarted = function () {
        var obj = _.findWhere(dataService.tasksList, {current: true});
        if (obj == undefined) {
          return false
        }
        else if (obj.current == true) {
          dataService.showTime = true;
          updateTaskTime.StartTimer(obj);
          $interval(function () {
            $scope.tasksList = dataService.tasksList;
            //console.log(obj);
          }, 1000);
        }
        // console.log(obj)
      };
      $scope.checkStarted();
      // if (dataService.showTime === true) {
      //   $interval(function () {
      //     $scope.timeCount = dataService.AllWorkedTime;
      //     // console.log(typeof $scope.timeCount)
      //   }, 1000);
      // }
      $scope.clicked = function (task) {// переход в конкретную задачу
        dataService.currentTask = task;
        $state.go('app.order');

        console.log('SERVICE---' + dataService.currentTask);
      };
      // Старт стоп задачи
      $scope.toggleT = function (task) {

        APIService.toggleState(task.id)
          .then(function success(resp) {
            console.log(resp);

            if (resp.data.started === false && resp.data.success === true) {

              dataService.showTime = false;
              updateTaskTime.StopTimer(task);
              APIService.requestTasks()
                .then(function success(res) {
                  if (!res.data.success) {
                    alert(res.data.error);
                  } else {
                    console.log(res);
                    dataService.tasksList = res.data.tasks;
                    $scope.tasksList = dataService.tasksList;
                  }

                });

              
            } else if (resp.data.started === true && resp.data.success === true) {
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
                  updateTaskTime.StartTimer(obj);
                  $interval(function () {
                    dataService.tasksList = $scope.tasksList;
                    $scope.timeCount = dataService.AllWorkedTime;
                    // console.log(typeof $scope.timeCount);
                  }, 1000);

                }
              })
            }
          })
      }
    }
  ]);
