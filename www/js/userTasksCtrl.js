APP
  .controller('UserTasksCtrl',
    function ($scope,
              $state,
              $ionicPopup,
              $ionicListDelegate,
              updateMemberTime,
              $interval,
              APIService,
              showTeam,
              dataService,
              $cordovaToast,
              $stateParams) {
      $scope.user=_.findWhere(dataService.currentTeam.users, {id: $stateParams.id});
      console.log($scope.user);
      APIService.requestUserTasks($stateParams.id)
        .success(function (res) {

          $scope.userTasks = dataService.memberTasks=res.tasks;
          console.log(dataService.memberTasks);
          $scope.id = $stateParams.id;
          $scope.checkStarted();
        });

      $scope.timeCount = dataService.AllWorkedTime;
      console.log('UserTasksCtrl');


      $scope.checkStarted = function () {
        var obj = _.findWhere(dataService.memberTasks, {current: true});
        console.log(obj);
        if (obj == undefined) {
          return false
        }
        else if (obj.current == true) {
          // dataService.showTime = true;
          updateMemberTime.StartTimer(obj)
        }
      };

      $scope.$watch(function () {
        return dataService.memberTasks;
      }, function (newVal, oldVal, scope) {
        if (newVal) {
          $scope.userTasks = newVal;
          // console.log(newVal);
        }
      });
      $scope.toggleT = function (task) {

        APIService.toggleState(task.id)
          .then(function success(resp) {
            console.log(resp);
            if (resp.data.success === false) {
              $cordovaToast.showShortTop(resp.data.error);
            }
            if (resp.data.started === false && resp.data.success === true) {
              $cordovaToast.showShortTop('Task stopped');
              // dataService.showTime = false;
              updateMemberTime.StopTimer(task);
              APIService.requestUserTasks($scope.id)
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
              $cordovaToast.showShortTop('Task started');
              APIService.requestUserTasks($scope.id)
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
                APIService.requestUserTasks($stateParams.id)
                  .success(function (res) {

                    $scope.userTasks = dataService.memberTasks=res.tasks;
                    console.log(dataService.memberTasks);
                    $scope.id = $stateParams.id;
                  });
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

    });
