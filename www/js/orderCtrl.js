APP
  .controller('OrderCtrl',
    function ($scope, $stateParams, APIService, $cordovaToast, dataService, updateOneTime, $interval) {
      //$scope.orderId = $stateParams.orderId;
      $scope.currentTask = dataService.currentTask =_.findWhere(dataService.tasksList, {id: $stateParams.orderId});

       console.log($scope.currentTask);
      $scope.$watch(function () {
        return dataService.currentTask.time;
      }, function (newVal, oldVal, scope) {
        if(newVal) {
          $scope.currentTask.time = newVal;
          // console.log(newVal);
        }
        // console.log(dataService.currentTask.time)
      });
      $scope.$watch(function(){
        return dataService.AllWorkedTime
      }, function (newVal, oldVal, scope) {
        if(newVal) {
          $scope.timeCount = newVal;
          // console.log($scope.timeCount)
        }
      });
      //  var orderInterval;
      //
      //  function orderTimer(){
      //      orderInterval=$interval(order, 1000)
      //  }
      // function order (){
      //        $scope.tasksList = dataService.tasksList;
      //        // $scope.timeCount = dataService.AllWorkedTime;
      //        $scope.currentTask.time=dataService.currentTask.time;
      //        console.log($scope.currentTask.time);
      // }
      //  function stopInterval() {
      //        $interval.cancel(orderInterval);
      //    }
       $scope.checkStarted = function () {
         if ($scope.currentTask.current == true) {
           dataService.showTime = true;
           updateOneTime.StartTimer($scope.currentTask);
           // orderTimer();
         }else{
           updateOneTime.StopTimer($scope.currentTask);
           // stopInterval();
         }
         // console.log(obj)
       };
       $scope.checkStarted();
       $scope.toggleT = function (task) {
         APIService.toggleState(task.id)
           .then(function success(resp) {
             dataService.showTime=true;
             console.log(resp);
             if (resp.data.started === false && resp.data.success === true) {
               $cordovaToast.showShortTop('Task stopped');
               // start timer
               dataService.showTime = false;
               updateOneTime.StopTimer(task);
               // stopInterval();
               // dataService.currentTask = $scope.currentTask;
               APIService.requestTasks()
                 .then(function success(res) {
                   if (!res.data.success) {
                     alert(res.data.error);
                   } else {
                     console.log(res);
                     dataService.tasksList = res.data.tasks;
                     $scope.tasksList = dataService.tasksList;
                     // stopInterval();
                     var obj = _.findWhere(dataService.tasksList, {id: task.id});
                     $scope.currentTask = obj;
                   }

                 });

               console.log(resp.data.started);
             } else if (resp.data.started === true && resp.data.success === true) {
               // stop timer
               $cordovaToast.showShortTop('Task started');
               $scope.currentTask.current = true;

               // dataService.currentTask = $scope.currentTask;
               console.log(resp.data.started);
             }
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
                 updateOneTime.StartTimer(obj);
                 // orderTimer();

               }
               else if(obj.current == false){
                 dataService.showTime = true;
                 updateOneTime.StopTimer(obj);
               // stopInterval();
               }
             })
           })
       }
    });
