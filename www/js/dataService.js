/**
 * Created by smissltd on 19.05.16.
 */
APP

  .service('dataService', function () {
    this.tasksList = {};
    this.currentTask = {
      // id: null,
      // time: function (num) {
      //   var h = Math.floor(num / 3600);
      //   var m = Math.floor(num / 60) % 60;
      //   var s = num % 60;
      //   if (m < 10)
      //     m = '0' + m;
      //   if (s < 10)
      //     s = '0' + s;
      //   var time = h + ':' + m + ':' + s;
      //   return time
      //}
      current: null,
      name: 'stringName'

    };
    this.AllWorkedTime = 0;
    this.showTime = undefined;
  });

APP

  .factory('updateTaskTime', function ($interval, dataService) {//$scope нельзя передавать в сервисы
    return { //function ($scope, $interval)
      Timer: null,
      StartTimer: function (task) {
        //Set the Timer start message.
        dataService.showTime = "Timer started. ";
        var obj = _.findWhere(dataService.tasksList, {id: task.id});
        //Initialize the Timer to run every 1000 milliseconds i.e. one second.
        this.Timer = $interval(function () {
       
          obj.time++;
          console.log(obj.time);


        }, 1000);
      },
      StopTimer: function (task) {
        if (angular.isDefined(this.Timer)) {
          $interval.cancel(this.Timer);
        }
      }
    }
  });

