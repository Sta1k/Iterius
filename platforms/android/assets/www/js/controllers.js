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
        $scope.tasksList = dataService.tasksList;//взяли из сервиса

        $scope.checkStarted = function () {
          var obj = _.findWhere(dataService.tasksList, {current: true});
          if (obj == undefined) {
            return false
          }
          else if (obj.current == true) {
            updateTaskTime.StartTimer(obj);
            $interval(function () {
              $scope.tasksList = dataService.tasksList;
              //console.log(obj);
            }, 1000);
          }
          // console.log(obj)
        };
        $scope.checkStarted();

        $scope.clicked = function (task) {// переход в конкретную задачу
          $state.go('app.order');
          dataService.currentTask = task;
          // console.log(dataService.currentTask)
        };
        // $scope.allWorkedTime = dataService.allWorkedTime;
        $scope.toggleT = function (task) {
          //dataService.currentTask = task;
          taskToggle.toggleState(task.id)
            .then(function success(resp) {
              console.log(resp);

              if (resp.data.started === false && resp.data.success === true) {
                // task.current = false;
                // start timer
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
                
                console.log(resp.data.started);
              } else if (resp.data.started === true && resp.data.success === true) {
                task.current = true;// stop timer
                // taskService.requestData()
                //   .then(function (res) {
                //     if (!res.data.success) {
                //       alert(res.data.error);
                //     } else {
                //       //console.log(res);
                //       dataService.tasksList = res.data.tasks;
                //     }
                //     $scope.tasksList = dataService.tasksList;
                //   })
                  
                var obj = _.findWhere(dataService.tasksList, {id: task.id});
                updateTaskTime.StartTimer(obj);
                $interval(function () {
                  dataService.tasksList = $scope.tasksList;
                  console.log($scope.tasksList);
                }, 1000);


              }
              taskService.requestData()
                .then(function success(res) {
                  if (!res.data.success) {
                    alert(res.data.error);
                  } else {
                    console.log(res);
                    dataService.tasksList = res.data.tasks;
                  }

                });

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
        $scope.currentTask = dataService.currentTask;

        $scope.Timer = null;
        $scope.StartTimer = function (num) {
          //Set the Timer start message.
          //$scope.showTime = "Timer started. ";


          //Initialize the Timer to run every 1000 milliseconds i.e. one second.
          $scope.Timer = $interval(function () {
            var h = Math.floor(num / 3600);
            var m = Math.floor(num / 60) % 60;
            var s = num % 60;
            if (m < 10)
              m = '0' + m;
            if (s < 10)
              s = '0' + s;
            //Display the current time.
            $scope.currentTask.time++;
            num++;
            var time = h + ':' + m + ':' + s;
            $scope.showTime = time;

          }, 1000);

        };
        $scope.StopTimer = function (num) {
          //Set the Timer stop showTime.
          var h = Math.floor(num / 3600);
          var m = Math.floor(num / 60) % 60;
          var s = num % 60;
          if (m < 10)
            m = '0' + m;
          if (s < 10)
            s = '0' + s;
          var time = h + ':' + m + ':' + s;
          $scope.showTime = time;
          //Cancel the Timer.
          if (angular.isDefined($scope.Timer)) {
            $interval.cancel($scope.Timer);
          }
          console.log($scope.showTime)
        };

        if ($scope.currentTask.current === true) {
          $scope.StartTimer($scope.currentTask.time)
        }
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
  .controller('CreateCtrl', function ($scope, $stateParams) {
  })
  .controller('TeamCtrl', function ($scope, $stateParams) {
  })
  .controller('SplashController', function ($scope, $stateParams) {
  });

angular.module('tt')
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
                    console.log(dataService.tasksList);
                    $state.go('app.tasks');
                  }

                })
            } else {
              alert('Server error');

            }

          }, function err(res) {
            console.log(res.status + ' ' + res.statusText);
          })
          .finally(function ($stateParams) {
            // $state.go('app.tasks');

          })
        ;
        // $state.go('app.tasks');
      };


    });


