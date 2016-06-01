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

  .service('updateTaskTime',function (dataService) {
    return function (task) {
      var taskTime = 0;
      
      var workedTime = task.time;
      if (!workedTime && workedTime !== 0)
        return;
      var clientTime = Math.floor(Date.now() / 1000);
      var startTime = clientTime - workedTime;
      var now = Math.floor(Date.now() / 1000);
      var diff = now - startTime;
      var h = Math.floor(diff / 3600);
      var m = Math.floor(diff / 60) % 60;
      var s = diff % 60;
      if (m < 10)
        m = '0' + m;
      if (s < 10)
        s = '0' + s;
      dataService.allWorkedTime = h + ' : ' + m + ' : ' + s;
    };
  });

