/**
 * Created by smissltd on 19.05.16.
 */
APP
  .service('dataService', function () {
    this.tasksList = {};
    this.currentUser=null;
    this.currentTask = {};
    this.memberTasks=[];
    this.AllWorkedTime = 0;
    this.showTime = undefined;
  });

APP
  .factory('updateTaskTime', function ($interval, dataService) {//$scope нельзя передавать в сервисы
    return {
      Timer: null,
      StartTimer: function (task) {
        var obj = _.findWhere(dataService.tasksList, {id: task.id});
        this.Timer = $interval(function () {
          obj.time++;
          // console.log(obj.time);
          var arr = _.pluck(dataService.tasksList, 'time');
          summa = function (m) {
            for (var s = 0, k = m.length; k; s += m[--k]);
            dataService.AllWorkedTime = s;
          };
          summa(arr);
        }, 1000);
      },
      StopTimer: function (task) {
        if (angular.isDefined(this.Timer)) {
          $interval.cancel(this.Timer);
        }
      }
    }
  });
APP
  .factory('updateMemberTime', function ($interval, dataService) {//$scope нельзя передавать в сервисы
    return {
      Timer: null,
      StartTimer: function (task) {
        var obj = _.findWhere(dataService.memberTasks, {id: task.id});
        this.Timer = $interval(function () {
          obj.time++;
          // console.log(obj.time);
          
        }, 1000);
      },
      StopTimer: function (task) {
        if (angular.isDefined(this.Timer)) {
          $interval.cancel(this.Timer);
        }
      }
    }
  });

 APP 
   .factory('showTeam',function () {
     return{
       show:false
     }
   });

