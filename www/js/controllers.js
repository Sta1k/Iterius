angular.module('tt')

  .controller('AppCtrl', function ($scope) {
  })

  .controller('TasksCtrl', function ($scope, dataService,updateTaskTime, taskService, taskToggle, $state, $stateParams) {
    $scope.tasksList = dataService.tasksList;
    $scope.clicked = function (task) {
      $state.go('app.order');
      dataService.currentTask = task;
      console.log(dataService.currentTask)
    };
    $scope.toggle = function (task) {
      taskToggle.toggleState(task.id)
        .then(function success(resp) {
          console.log(resp);
          if(!resp.data.started){

            $scope.tasksList = resp.data.tasks;
            dataService.tasksList = $scope.tasksList;
            updateTaskTime(task);
            console.log(resp.data.started);
          }else{
            $scope.tasksList = resp.data.tasks;
            dataService.tasksList = $scope.tasksList;
            setInterval(updateTaskTime(task), 500);
            console.log(resp.data.started);
          }
          taskService.requestData()
            .then(function success(res) {
                if (!res.data.success) {
                  alert(res.data.error);
                } else {
            
                  //$state.go('app.tasks');
            
            
                }
            
            })
        })
    }
  })
  .controller('OrderCtrl', function ($scope, $stateParams, dataService) {
    $scope.currentTask = dataService.currentTask;
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


