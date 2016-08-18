/**
 * Created by smissltd on 19.05.16.
 */
APP.service('data', function () {
  this.check = undefined;
  this.user = {
    role: undefined,
    finger: undefined
  };
});
APP
  .service('dataService', function (data) {
    var db = window.openDatabase('iterius_db', 1, 'mobile', 2 * 1024 * 1024);
    this.Global = {};
    this.editingTask = {};
    this.tasksList = {};
    this.currentUser = null;
    this.currentTask = {};
    this.memberTasks = [];
    this.login = {};
    this.AllWorkedTime = 0;
    this.lang = undefined;
    this.check = undefined;
    this.DBoff = function () {
      db.transaction(function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS LOGS ');
        console.log('DB deleted')
      });
    };

    this.checkRemember = function () {
      db.transaction(function (tx) {
        tx.executeSql('SELECT finger,remember,username,password FROM LOGS', [], function (tx, results) {
          data.check = results.rows.item(0).remember;
          data.user.username = results.rows.item(0).username;
          data.user.password = results.rows.item(0).password;
          data.user.finger = results.rows.item(0).finger;
          console.log(data);
        }, null);
      });
      
    };

    this.delRemember = function () {
      db.transaction(function (tx) {
        tx.executeSql('INSERT OR REPLACE INTO LOGS (id, remember) VALUES (1, "'
          + 'false' + '")');
        // APIService.login(data.user)
      }, null);
      // data.user={};

    };
    this.writeDB = function (obj) {//finger
      db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique,username,password,finger,remember)');
        if (!obj.touch) {
          tx.executeSql('INSERT OR REPLACE INTO LOGS (id, username, password, remember) VALUES (1, "'
            + obj.username + '","' + obj.password + '","' + obj.remember + '")');
        } else {
          tx.executeSql('INSERT OR REPLACE INTO LOGS (id, username, password, finger) VALUES (1, "'
            + obj.username + '","' + obj.password + '","' + obj.touch + '")');
        }

      });
      console.log(
        'SAVED \nLOGIN :' + obj.username +
        '\nPASSWORD :' + obj.password +
        '\nFinger :' + obj.touch);

    };
    this.checkFinger = function () {
      db.transaction(function (tx) {
        tx.executeSql('SELECT finger,username,password FROM LOGS', [], function (tx, results) {
          return results.rows.item(0).finger;
        })

      })
    };
    this.readDb = function (success, error) {
      db.transaction(function (tx) {
        tx.executeSql('SELECT username,password FROM LOGS', [], function (tx, results) {
          data.user.username = results.rows.item(0).username;
          data.user.password = results.rows.item(0).password;
          console.log(data);
        }, null);
      });
    }


  });

APP
  .factory('updateTaskTime', function ($interval, dataService) {//$scope нельзя передавать в сервисы
    return {
      Timer: null,
      StartTimer: function (task) {
        var obj = _.findWhere(dataService.tasksList, {id: task.id});
        this.Timer = $interval(function () {
          // var clientTime = Math.floor(Date.now() / 1000);
          // var startTime = clientTime - obj.time;

          // var now = Math.floor(Date.now() / 1000);
          // var diff = now - startTime;

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
  .factory('updateOneTime', function ($interval, dataService) {//$scope нельзя передавать в сервисы
    return {
      Timer: null,
      StartTimer: function (task) {
        var obj = _.findWhere(dataService.tasksList, {id: task.id});
        this.Timer = $interval(function () {
          // var clientTime = Math.floor(Date.now() / 1000);
          // var startTime = clientTime - obj.time;

          // var now = Math.floor(Date.now() / 1000);
          // var diff = now - startTime;

          obj.time++;
          dataService.currentTask.time++;
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
  .factory('showTeam', function () {
    return {
      show: false
    }
  });

