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

      $scope.checkStarted = function () {
        var obj = _.findWhere(dataService.tasksList, {current: true});
        if (obj == undefined) {
          console.log('no active task')
          return false

        }
        else if (obj.current == true) {
          dataService.showTime = true;
          updateTaskTime.StartTimer(obj);
          $interval(function () {
            $scope.tasksList = dataService.tasksList;

            $scope.timeCount = dataService.AllWorkedTime;

            // console.log($scope.timeCount);
          }, 1000);
        }
        // console.log(obj)
      };

      $interval(function () {
        APIService.requestTasks()
          .then(function success(res) {
            if (!res.data.success) {

              alert(res.data.error);

            } else {
              dataService.tasksList = res.data.tasks;
              $scope.tasksList = dataService.tasksList;
              var arr = _.pluck(dataService.tasksList, 'time');
              summa = function (m) {
                for (var s = 0, k = m.length; k; s += m[--k]);
                dataService.AllWorkedTime = s;
                $scope.timeCount = dataService.AllWorkedTime;
              };
              summa(arr);
              // console.log('INTERVAL');
              $scope.checkStarted();
            }
          })
      }, 60000);
      console.log('tasksCtrl');
      APIService.requestTasks()
        .then(function success(res) {
          $scope.busy = true;
          if (!res.data.success) {
            $scope.busy = false;
            alert(res.data.error);

          } else {
            dataService.tasksList = res.data.tasks;
            $scope.tasksList = dataService.tasksList;
            var arr = _.pluck(dataService.tasksList, 'time');
            summa = function (m) {
              for (var s = 0, k = m.length; k; s += m[--k]);
              dataService.AllWorkedTime = s;
              $scope.timeCount = dataService.AllWorkedTime;
            };
            summa(arr);
            console.log(dataService.tasksList);
            $scope.checkStarted();
          }
        }).finally(function () {
        $scope.busy = false
      })

      //взяли из сервиса


      $scope.clicked = function (task) {
        $scope.busy = true;

        $scope.currentTask = task;
        dataService.currentTask = task;
        // $scope.currentTask = dataService.currentTask;
        APIService.requestTasks().then(function () {
          console.log(dataService.currentTask);
          $scope.busy = false;
          $state.go('app.order');
        });


      };
      // Старт стоп задачи
      // $scope.toggleT = function (task) {
      //   if(!task){
      //     task=dataService.currentTask;
      //     console.log(task);
      //     console.log(dataService.currentTask)
      //   }

      //   APIService.toggleState(task.id)
      //     .then(function success(resp) {
      //       console.log(resp);

      //       if (resp.data.started === false && resp.data.success === true) {

      //         dataService.showTime = false;
      //         updateTaskTime.StopTimer(task);
      //         APIService.requestTasks()
      //           .then(function success(res) {
      //             if (!res.data.success) {
      //               alert(res.data.error);
      //             } else {
      //               console.log(res);
      //               dataService.tasksList = res.data.tasks;
      //               $scope.tasksList = dataService.tasksList;
      //             }

      //           });


      //       } else if (resp.data.started === true && resp.data.success === true) {
      //         APIService.requestTasks()
      //           .then(function success(res) {
      //             if (!res.data.success) {
      //               alert(res.data.error);
      //             } else {
      //               console.log(res);
      //               dataService.tasksList = res.data.tasks;
      //             }

      //           }).then(function () {
      //           $scope.tasksList = dataService.tasksList;

      //           var obj = _.findWhere(dataService.tasksList, {id: task.id});
      //           console.log(obj);
      //           if (obj == undefined) {
      //             return false
      //           }
      //           else if (obj.current == true) {
      //             dataService.showTime = true;
      //             updateTaskTime.StartTimer(obj);
      //             $interval(function () {
      //               dataService.tasksList = $scope.tasksList;
      //               $scope.timeCount = dataService.AllWorkedTime;
      //               // console.log(typeof $scope.timeCount);
      //             }, 1000);

      //           }
      //         })
      //       }
      //     })
      // }
    }
  ]);
