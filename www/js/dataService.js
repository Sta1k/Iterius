/**
 * Created by smissltd on 19.05.16.
 */
APP.service('data', function () {
  this.check = undefined;
  this.user = {
    role : undefined
  };
})
APP
  .service('dataService', function (data, APIService) {
    var db = window.openDatabase('iterius_db', 1, 'mobile', 2 * 1024 * 1024);
    this.tasksList = {};
    this.currentUser = null;
    this.currentTask = {};
    this.memberTasks = [];
    this.login = {};
    this.AllWorkedTime = 0;
    this.showTime = undefined;
    this.check = undefined;
    this.DBoff = function () {
      db.transaction(function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS LOGS ');
        console.log('DB deleted')
      });
    };
    this.checkDB = function () {
      db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
          data.check = results.rows.item(2).log
          console.log('Login: ' + results.rows.item(0).log +
            'Pass: ' + results.rows.item(1).log);
        }, null);
      })
    };
    this.checkRemember = function () {
      db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGS WHERE id>=4', [], function (tx, results) {
          data.check = results.rows.item(2).log;
          data.user.username = results.rows.item(0).log;
          data.user.password = results.rows.item(1).log;
          data.user.remember = true;
          console.log(data.user);
          // APIService.login(data.user)
        }, null);
      });

    };
    this.delRemember = function () {
      db.transaction(function (tx) {
        tx.executeSql('INSERT OR REPLACE INTO LOGS (id, log) VALUES (10, "'
          + 'false' + '")');
        // APIService.login(data.user)
      }, null);


    };
    this.writeDB = function (obj) {

      db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
        tx.executeSql('INSERT OR REPLACE INTO LOGS (id, log) VALUES (1, "'
          + obj.username + '")');
        tx.executeSql('INSERT OR REPLACE INTO LOGS (id, log) VALUES (2, "'
          + obj.password + '")');

      });
      console.log(
        'SAVED \nLOGIN :' + obj.username +
        '\nPASSWORD :' + obj.password);

    };
    this.rememberMe = function (obj) {

      db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
        tx.executeSql('INSERT OR REPLACE INTO LOGS (id, log) VALUES (4, "'
          + obj.username + '")');
        tx.executeSql('INSERT OR REPLACE INTO LOGS (id, log) VALUES (5, "'
          + obj.password + '")');
        tx.executeSql('INSERT OR REPLACE INTO LOGS (id, log) VALUES (10, "'
          + 'on' + '")');
      });
      console.log(
        'SAVED \nLOGIN :' + obj.username +
        '\nPASSWORD :' + obj.password);

    };
    this.readDb = function (success, error) {

      db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
          var len = results.rows.length, i;
          msg = "Found rows: " + len;
          console.log(msg +
            '\nlogin: ' + results.rows.item(0).log +
            '\npass: ' + results.rows.item(1).log);
          data.user.username = results.rows.item(0).log;
          data.user.password = results.rows.item(1).log;

          // console.log('LOADED \nLOGIN :'
          //     + datasec.Username+'\nPASSWORD :'
          //     +datasec.Password+'\nCODE :'+datasec.Code);


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
          dataService.currentTask.time++
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

APP
  .factory('Notification', function ($ionicPopup) {
    return {
      showAlert: function (message) {
        var alertPopup = $ionicPopup.alert({
          title: 'Alert',
          template: message
        });

      }
    }
  });
