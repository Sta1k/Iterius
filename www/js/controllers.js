APP

  .controller('AppCtrl', function ($scope) {
  })

  .controller('TasksCtrl',
    ['$scope',
      'dataService',
      'updateTaskTime',
      'taskService',
      '$filter',
      'taskToggle',
      '$state',
      '$interval',
      '$stateParams',
      function ($scope,
                dataService,
                updateTaskTime,
                taskService,
                $filter,
                taskToggle,
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
        if (dataService.showTime === true) {
          $interval(function () {
            $scope.timeCount = dataService.AllWorkedTime;
            // console.log(typeof $scope.timeCount)
          }, 1000);
        }
        $scope.clicked = function (task) {// переход в конкретную задачу
          dataService.currentTask = task;
          $state.go('app.order');
          
          console.log('SERVICE---'+dataService.currentTask);
        };
        // Старт стоп задачи
        $scope.toggleT = function (task) {
          
          taskToggle.toggleState(task.id)
            .then(function success(resp) {
              console.log(resp);

              if (resp.data.started === false && resp.data.success === true) {

                dataService.showTime = false;
                updateTaskTime.StopTimer(task);
                taskService.requestData()
                  .then(function success(res) {
                    if (!res.data.success) {
                      alert(res.data.error);
                    } else {
                      console.log(res);
                      dataService.tasksList = res.data.tasks;
                    }

                  });

                $scope.tasksList = dataService.tasksList;
              } else if (resp.data.started === true && resp.data.success === true) {
                taskService.requestData()
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
      }])


  /*контроллер единичной задачи*/
  .controller('OrderCtrl',
    ['$scope',
      'dataService',
      'updateTaskTime',
      'taskService',
      '$filter',
      'taskToggle',
      '$state',
      '$interval',
      '$stateParams',

      function ($scope, timing, $stateParams, taskToggle, taskService, dataService, $interval) {
        console.log('orderCtrl');
        $scope.currentTask = dataService.currentTask;
        console.log('TASK---'+dataService.currentTask);
        // if ($scope.currentTask.current === true) {
        //   $scope.StartTimer($scope.currentTask.time)
        // }else{
        //   return false
        // }
        $scope.toggleT = function (task) {
          taskToggle.toggleState(task.id)
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
              taskService.requestData()
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
      }])
  
  .controller('CreateCtrl', function ($scope,dataService, createTask, $stateParams) {
    console.log('createCtrl');
    $scope.task={};
    $scope.timeCount = dataService.AllWorkedTime;
    $scope.createT = function () {
      createTask.TaskCreate().then(function (res) {
        console.log(res)
      })
    }
  })
  .controller('TeamCtrl', function ($scope, $stateParams) {
  })
  .controller('SplashController', function ($scope, $stateParams) {
  });

APP
  .controller('LoginCtrl',
    function ($scope, loginService, taskService, $state, dataService, $stateParams) {
      $scope.user = {
        username: "Admin11",
        password: "Admin11",
        remember: true
      };
      $scope.LogIn = function () {
        // document.getElementById('loginButton').disabled=true;

        loginService.sendData($scope.user)

          .then(function
            success(response) {
            // console.log(response);


            if (response.data.success) {
              taskService.requestData()
                .then(function success(res) {
                  if (!res.data.success) {

                    alert(res.data.error);

                  } else {
                    dataService.tasksList = res.data.tasks;
                    var arr= _.pluck(dataService.tasksList, 'time');
                    summa = function(m) {
                      for(var s = 0, k = m.length; k; s += m[--k]);
                      dataService.AllWorkedTime = s;
                    };
                    summa(arr);
                    console.log(dataService.tasksList);
                    $state.go('app.tasks');
                  }

                })
            } else {
              alert('Server error');

            }

          }, function err(res) {
            console.log(res.status + ' ' + res.statusText);
          });

      };
    });


