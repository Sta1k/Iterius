angular.module('tt')

  .controller('AppCtrl', function ($scope) {
  })

  .controller('TasksCtrl', /*['TIMER',*/ function ($scope, dataService, taskService, $filter, taskToggle, $state, $interval, $stateParams) {
    $scope.tasksList = dataService.tasksList;//взяли из сервиса
    $scope.Timer = null;
    $scope.StartTimer = function (num) {
      //Set the Timer start message.
      $scope.showTime = "Timer started. ";

      //Initialize the Timer to run every 1000 milliseconds i.e. one second.
      $scope.Timer = $interval(function () {
        //Display the current time.
        var time = $filter('date')(num, 'HH:mm:ss');
        $scope.showTime = time;
      }, 1000);
    };
    $scope.StopTimer = function (num) {
      //Set the Timer stop showTime.
      var time = $filter('date')(num, 'HH:mm:ss');
      $scope.showTime = time;
      //Cancel the Timer.
      if (angular.isDefined($scope.Timer)) {
        $interval.cancel($scope.Timer);
      }
    };

    $scope.clicked = function (task) {
      $state.go('app.order');
      dataService.currentTask = task;
      console.log(dataService.currentTask)
    };
    // $scope.allWorkedTime = dataService.allWorkedTime;
    $scope.toggleT = function (task) {
      $scope.currentTask = task;
      taskToggle.toggleState(task.id)
        .then(function success(resp) {
          console.log(resp);
          if (!resp.data.started) {

            // start timer
            $scope.StopTimer(task.time);
            dataService.tasksList = $scope.tasksList;
            // updateTaskTime(task);
            console.log(resp.data.started);
          } else {
            // stop timer
            $scope.StartTimer(task.time);
            // dataService.tasksList = $scope.tasksList;
            // setInterval(updateTaskTime(task), 500);
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
  }/*]*/)
  .controller('OrderCtrl', function ($scope, $stateParams, taskToggle, taskService, dataService, $interval, $filter) {
    $scope.Timer = null;
    $scope.StartTimer = function (num) {
      //Set the Timer start message.
      $scope.showTime = "Timer started. ";

      //Initialize the Timer to run every 1000 milliseconds i.e. one second.
      $scope.Timer = $interval(function () {
        //Display the current time.
        var time = $filter('date')(num, 'HH:mm:ss');
        $scope.showTime = time;
      }, 1000);
    };
    $scope.StopTimer = function (num) {
      //Set the Timer stop showTime.
      var time = $filter('date')(num, 'HH:mm:ss');
      $scope.showTime = time;
      //Cancel the Timer.
      if (angular.isDefined($scope.Timer)) {
        $interval.cancel($scope.Timer);
      }
    };
    $scope.currentTask = dataService.currentTask;
    $scope.toggleT = function (task) {
      taskToggle.toggleState(task.id)
        .then(function success(resp) {
          console.log(resp);
          if (!resp.data.started) {

            // start timer
            $scope.StopTimer();
            // dataService.tasksList = $scope.tasksList;
            // updateTaskTime(task);
            console.log(resp.data.started);
          } else {
            // stop timer
            $scope.StartTimer(task.time);
            // dataService.tasksList = $scope.tasksList;
            // setInterval(updateTaskTime(task), 500);
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
  })
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


