/**
 * Created by smissltd on 19.05.16.
 */
APP

  .service('dataService', function () {
    this.tasksList = {};
    currentTask = {
      
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
        
        var obj = _.findWhere(dataService.tasksList, {id: task.id});
        //Initialize the Timer to run every 1000 milliseconds i.e. one second.
        this.Timer = $interval(function () {
       
          obj.time++;
          // console.log(obj.time);
          var arr= _.pluck(dataService.tasksList, 'time');
          summa = function(m) {
            for(var s = 0, k = m.length; k; s += m[--k]);
            dataService.AllWorkedTime = s;
          };
          summa(arr);
          // console.log(typeof dataService.AllWorkedTime)


        }, 1000);
      },
      StopTimer: function (task) {
        if (angular.isDefined(this.Timer)) {
          $interval.cancel(this.Timer);
        }
      }
      
    }
  });

