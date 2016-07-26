APP.controller('TasksCtrl',
  ['$scope',
    '$rootScope',
    '$ionicPopup',
    '$ionicListDelegate',
    'dataService',
    'updateTaskTime',
    '$filter',
    '$cordovaVibration',
    '$cordovaToast',
    'APIService',
    '$state',
    '$interval',
    '$stateParams',
    function ($scope,
              $rootScope,
              $ionicPopup,
              $ionicListDelegate,
              dataService,
              updateTaskTime,
              $filter,
              $cordovaVibration,
              $cordovaToast,
              APIService,
              $state,
              $interval,
              $stateParams) {

      $rootScope.$on("logout", function () {
        console.log('!!!!!!');
        $rootScope = $rootScope.$new(true);
        $scope = $scope.$new(true);
        dataService = undefined;
        data = undefined;
        $interval.cancel(stopInterval)
      });
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
        $scope.busy = false;
      });

      $scope.checkStarted = function () {
        var obj = _.findWhere(dataService.tasksList, {current: true});
        if (obj == undefined) {
          console.log('no active task')
          return false
        }
        else if (obj.current == true) {
          dataService.showTime = true;
          updateTaskTime.StartTimer(obj);
          // $interval(function () {
          //   $scope.tasksList = dataService.tasksList;
          //
          //   $scope.timeCount = dataService.AllWorkedTime;
          //
          //   // console.log($scope.timeCount);
          // }, 1000);
        }
        // console.log(obj)
      };
      $scope.$watch(function () {
        return dataService.tasksList;
      }, function (newVal, oldVal, scope) {
        if (newVal) {
          $scope.tasksList = newVal;
          // console.log(newVal);
        }
        // console.log(dataService.currentTask.time)
      });
      $scope.$watch(function () {
        return dataService.AllWorkedTime
      }, function (newVal, oldVal, scope) {
        if (newVal) {
          $scope.timeCount = newVal;
          // console.log($scope.timeCount)
        }
      });

      function reqServ() {
        // $cordovaToast.showShortTop('Checking the server time');
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
      }

      var stopInterval = $interval(reqServ, 60000);

      //взяли из сервиса


      $scope.clicked = function (task) {
        $scope.busy = true;

        //$scope.currentTask = task;
        dataService.currentTask = task;
        // $scope.currentTask = dataService.currentTask;
        APIService.requestTasks().then(function () {
          // console.log(dataService.currentTask);
          $scope.busy = false;
          $state.go('app.tasks/:orderId', {orderId: task.id});
        });


      };
      $scope.editTask = function (task) {
        $ionicListDelegate.closeOptionButtons();
        APIService.TaskUpdate(task).then(function (res) {
          if (!res.data) {
            alert('Server error')
          } else {
            dataService.editingTask = res.data;
            console.log(dataService.editingTask);
          }
        }).then(function () {
          $state.go('app.create/:id', {id: task.id});
        })

      };
      $scope.showConfirm = function (obj) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Delete this Task',
          template: 'Are you sure you want to delete this Task?',
          cancelType: 'button-positive',
          okType: 'button-assertive'
        });
        confirmPopup.then(function (res) {
          if (res) {
            APIService.TaskDelete(obj).then(function (resp) {
              if (resp.data.success) {
                console.log(resp);
                reqServ();

              }
            })
          } else {
            console.log('You are not sure');
          }
        });
      };

      $scope.deleteTask = function (task) {
        $ionicListDelegate.closeOptionButtons();
        $scope.showConfirm(task)
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
