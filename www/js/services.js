APP
  .service('loginService', function ($http, $httpParamSerializerJQLike) {

    this.sendData = function (request) {
      //console.log(request);
      var login = {
        model: {
          username: request.username,
          password: request.password,
          remember: request.remember || false
        }
      };
      //console.log(login);
      return $http({
        method: 'POST',
        // permissions: ['http://172.16.3.141/'],
        url: 'http://dev.tt.smiss.ua/api/login',
        data: $httpParamSerializerJQLike(login),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {
        // handle success things
      }).error(function (data, status, headers, config) {
        // handle error things
      });

    };
  });

APP
  .service('taskService', function ($http/*, $httpParamSerializerJQLike*/) {
    this.requestData = function () {
      // console.log(req);
      return $http({
        method: 'POST',
        // data: $httpParamSerializerJQLike(),
        // permissions: ['http://172.16.3.141/'],
        url: 'http://dev.tt.smiss.ua/api/tasks'
      });
    };
  });

APP
  .service('taskToggle', function ($http, $httpParamSerializerJQLike) {
    this.toggleState = function (id) {

      // console.log(req);
      return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'POST',
        data: $httpParamSerializerJQLike({id: id}),
        // permissions: ['http://172.16.3.141/'],
        url: 'http://dev.tt.smiss.ua/api/toggle'
      })
    };
  });
APP
  .service('createTask', function ($http, $httpParamSerializerJQLike) {
    this.TaskCreate = function (object) {

      // console.log(req);
      return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'POST',
        data: $httpParamSerializerJQLike({
          title:        object.title,
          description:  object.desc
        }),

        url: 'http://dev.tt.smiss.ua/api/createTask'
      })
    };
  });
APP
  .filter('timing', function () {
    return function (num) {
      var h = Math.floor(num / 3600);
      var m = Math.floor(num / 60) % 60;
      var s = num % 60;
      if (m < 10)
        m = '0' + m;
      if (s < 10)
        s = '0' + s;
      out = h + ':' + m + ':' + s;
      return out;
    }
  });
