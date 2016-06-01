/**
 * Created by smissltd on 26.05.16.
 */
function updateTaskTime(element, startTime) {
  return function () {
    var now = Math.floor(Date.now() / 1000);
    var diff = now - startTime;
    var h = Math.floor(diff / 3600);
    var m = Math.floor(diff / 60) % 60;
    var s = diff % 60;
    if (m < 10)
      m = '0' + m;
    if (s < 10)
      s = '0' + s;
    element.html(h + ' : ' + m + ' : ' + s);
  };
}
function first() {


 var taskTime = $('#taskTime');
if (taskTime.length == 0)
  return;
var workedTime = taskTime.data('worked');
if (!workedTime && workedTime !== 0)
  return;
var clientTime = Math.floor(Date.now() / 1000);
var startTime = clientTime - workedTime;
updateTaskTime(taskTime, startTime)();
if (taskTime.data('active'))
  setInterval(updateTaskTime(taskTime, startTime), 500);
}
angular.module('tt')
  .service('TIMER',function ($scope, $interval) {


  $scope.Timer = null;

  //Timer start function.
  $scope.StartTimer = function () {
    //Set the Timer start message.
    $scope.Message = "Timer started. ";

    //Initialize the Timer to run every 1000 milliseconds i.e. one second.
    $scope.Timer = $interval(function () {
      //Display the current time.
      var time = $filter('date')(new Date(), 'HH:mm:ss');
      $scope.Message = "Timer Ticked. " + time;
    }, 1000);
  };

  //Timer stop function.
  $scope.StopTimer = function () {

    //Set the Timer stop message.
    $scope.Message = "Timer stopped.";

    //Cancel the Timer.
    if (angular.isDefined($scope.Timer)) {
      $interval.cancel($scope.Timer);
    }
  };
});
