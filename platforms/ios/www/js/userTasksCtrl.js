APP
  .controller('UserTasksCtrl',
    function ($scope,
              $state,
              updateMemberTime,
              $interval,
              APIService,
              showTeam,
              dataService,
              $cordovaToast,
              $stateParams) {
      $scope.timeCount = dataService.AllWorkedTime;
      console.log('UserTasksCtrl');
      $scope.userTasks = dataService.memberTasks;//взяли из сервиса
      console.log($scope.userTasks);
      $scope.user = dataService.currentUser;
      console.log($scope.user);
      $scope.checkStarted = function () {
        var obj = _.findWhere(dataService.memberTasks, {current: true});
        console.log(obj);
        if (obj == undefined) {
          return false
        }
        else if (obj.current == true) {
          // dataService.showTime = true;
          updateMemberTime.StartTimer(obj);
          $interval(function () {
            $scope.userTasks = dataService.memberTasks;
            // $scope.timeCount = dataService.AllWorkedTime;
            //console.log(obj);
          }, 1000);
        }
        // console.log(obj)
      };
      $scope.checkStarted();
      $scope.toggleT = function (task) {

        APIService.toggleState(task.id)
          .then(function success(resp) {
            console.log(resp);

            if (resp.data.started === false && resp.data.success === true) {
              $cordovaToast.showShortTop('Task stopped');
              // dataService.showTime = false;
              updateMemberTime.StopTimer(task);
              APIService.requestUserTasks($scope.user.id)
                .then(function success(res) {
                  if (!res.data.success) {
                    alert(res.data.error);
                  } else {
                    console.log(res);
                    dataService.memberTasks = res.data.tasks;
                    $scope.userTasks = dataService.memberTasks;
                  }

                });


            } else if (resp.data.started === true && resp.data.success === true) {
              $cordovaToast.showShortTop('Task stopped');
              APIService.requestUserTasks($scope.user.id)
                .then(function success(res) {
                  if (!res.data.success) {
                    alert(res.data.error);
                  } else {
                    console.log(res);
                    dataService.memberTasks = res.data.tasks;
                  }

                }).then(function () {
                $scope.userTasks = dataService.memberTasks;

                var obj = _.findWhere(dataService.memberTasks, {id: task.id});
                // console.log(obj);
                if (obj == undefined) {
                  return false
                }
                else if (obj.current == true) {
                  // dataService.showTime = true;
                  updateMemberTime.StartTimer(obj);
                  $interval(function () {
                    dataService.memberTasks = $scope.userTasks;
                    // $scope.timeCount = dataService.AllWorkedTime;
                    // console.log(dataService.memberTasks);
                  }, 1000);

                }
              })
            }
          })
      }


    });
