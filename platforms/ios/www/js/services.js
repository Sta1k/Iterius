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
        url: 'http://dev.tt.smiss.ua/api/login',
        data: $httpParamSerializerJQLike(
          login
        ),
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
      url: 'http://dev.tt.smiss.ua/api/tasks'
    });
  };
});

angular.module('tt')
  .service('taskService',function ($http/*, $httpParamSerializerJQLike*/ ) {
    this.requestData = function (id) {
      // console.log(req);
      return $http({
        method: 'POST',
        // data: $httpParamSerializerJQLike(),
        // permissions: ['http://172.16.3.141/'],
        url: 'http://dev.tt.smiss.ua/api/tasks'
      });
    };
  });
