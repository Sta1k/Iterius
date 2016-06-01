angular.module('tt')
  .service('loginService', function ($http, $httpParamSerializerJQLike) {

    this.sendData = function (request) {
      //console.log(request);
      var login = {
        model:
        {
          username: request.username,
          password: request.password,
          remember: request.remember||false
        }
      };
      //console.log(login);
      return $http({
        method: 'POST',
        // permissions: ['http://172.16.3.141/'],
        url: 'http://172.16.3.18:81/api/login',
        data: $httpParamSerializerJQLike(login),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {
        // handle success things
      }).error(function (data, status, headers, config) {
        // handle error things
      });

    };
  });

angular.module('tt')
  .service('taskService',function ($http/*, $httpParamSerializerJQLike*/ ) {
  this.requestData = function () {
    // console.log(req);
    return $http({
      method: 'POST',
      // data: $httpParamSerializerJQLike(),
      // permissions: ['http://172.16.3.141/'],
      url: 'http://172.16.3.18:81/api/tasks'
    });
  };
});

angular.module('tt')
  .service('taskToggle',function ($http, $httpParamSerializerJQLike ) {
    this.toggleState = function (id) {

      // console.log(req);
      return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'POST',
        data: $httpParamSerializerJQLike({id:id}),
        // permissions: ['http://172.16.3.141/'],
        url: 'http://172.16.3.18:81/api/toggle'
      })
    };
  });

// angular.module('tt',[])
//   .factory('TIMER',function ($scope, $interval) {
//
//
//     $scope.Timer = null;
//
//     //Timer start function.
//     $scope.StartTimer = function () {
//       //Set the Timer start message.
//       $scope.showTime = "Timer started. ";
//
//       //Initialize the Timer to run every 1000 milliseconds i.e. one second.
//       $scope.Timer = $interval(function () {
//         //Display the current time.
//         var time = $filter('date')(new Date(), 'HH:mm:ss');
//         $scope.showTime = "Timer Ticked. " + time;
//       }, 1000);
//     };
//
//     //Timer stop function.
//     $scope.StopTimer = function () {
//
//       //Set the Timer stop showTime.
//       $scope.showTime = "Timer stopped.";
//
//       //Cancel the Timer.
//       if (angular.isDefined($scope.Timer)) {
//         $interval.cancel($scope.Timer);
//       }
//     };
//   });
