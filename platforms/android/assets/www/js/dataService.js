/**
 * Created by smissltd on 19.05.16.
 */
angular.module('tt')
  
  .service('dataService',function () {
    this.tasksList = {};
    this.currentTask = undefined;
    this.AllWorkedTime=0
  });

angular.module('tt')

  .factory('updateTaskTime',function () {
    return function ($scope, $interval) {
      $scope.Timer = null;

      //Timer start function.
      this.StartTimer = function () {
        //Set the Timer start message.
        $scope.showTime = "Timer started. ";

        //Initialize the Timer to run every 1000 milliseconds i.e. one second.
        $scope.Timer = $interval(function () {
          //Display the current time.
          var time = $filter('date')(new Date(), 'HH:mm:ss');
          $scope.showTime = "Timer Ticked. " + time;
        }, 1000);
      };

      //Timer stop function.
      this.StopTimer = function () {

        //Set the Timer stop showTime.
        $scope.showTime = "Timer stopped.";

        //Cancel the Timer.
        if (angular.isDefined($scope.Timer)) {
          $interval.cancel($scope.Timer);
        }
      }
    }
  });

