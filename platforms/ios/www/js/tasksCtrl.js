APP.controller('TasksCtrl',
  ['$scope',
    '$rootScope',
    '$ionicPopup',
    '$ionicListDelegate',
    'dataService',
    'updateTaskTime',
    '$filter',
    '$translate',
    '$cordovaVibration',
    '$cordovaToast',
    'APIService',
    '$state',
    '$interval',
    '$timeout',
    '$stateParams',
    function ($scope,
              $rootScope,
              $ionicPopup,
              $ionicListDelegate,
              dataService,
              updateTaskTime,
              $filter,
              $translate,
              $cordovaVibration,
              $cordovaToast,
              APIService,
              $state,
              $interval,
              $timeout,
              $stateParams) {
      $timeout(navigator.splashscreen.hide(),2000);
      $rootScope.$on("logout", function () {
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
            $cordovaToast.showShortTop($scope.err1);
            $state.go('splash',{},{reload:true})
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
      $translate('server_error').then(function (result) {
        $scope.err1 = result;
      });
      $translate('delete_popup').then(function (result) {
        $scope.mes3 = result;
      });
      $translate('delete_popup2').then(function (result) {
        $scope.mes4 = result;
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
        }
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
              $cordovaToast.showShortTop($scope.err1)
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
            $cordovaToast.showShortTop($scope.err1)
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
          title: $scope.mes3,
          template: $scope.mes4,
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

    }
  ]);
