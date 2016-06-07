APP
  .service('APIService', function ($http, $httpParamSerializerJQLike) {
    this.login = function (request) {//loginService.sendData to APIService.login
      //console.log(request);
      var login = {
        model: {
          username: request.username,
          password: request.password,
          remember: request.remember || false
        }
      };      
      return $http({
        method: 'POST',
        url: 'http://dev.tt.smiss.ua/api/login',
        data: $httpParamSerializerJQLike(login),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {
        // handle success things
      }).error(function (data, status, headers, config) {
        // handle error things
      });
    };
    this.requestTasks = function () {//taskService.requestData заменить на APIService.requestTasks
      // console.log(req);
      return $http({
        method: 'POST',
        url: 'http://dev.tt.smiss.ua/api/tasks'
      });
    };
    this.toggleState = function (id) {//taskToggle.toggleState to APIService.toggleState
      return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'POST',
        data: $httpParamSerializerJQLike({id: id}),
        // permissions: ['http://172.16.3.141/'],
        url: 'http://dev.tt.smiss.ua/api/toggle'
      })
    };
    this.TaskCreate = function (object) {//createTask.TaskCreate to APIService.TaskCreate

      // console.log(req);
      return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'POST',
        data: $httpParamSerializerJQLike({
          title: object.title,
          description: object.desc
        }),
        url: 'http://dev.tt.smiss.ua/api/createTask'
      })
    };
    this.logout=function () {
      return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'POST',
        data: $httpParamSerializerJQLike({
          //data
        }),
        url: 'http://dev.tt.smiss.ua/api/logout'
      })
    };
    this.teamStatus = function () {
      return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'POST',
        data: $httpParamSerializerJQLike({
         //data
        }),
        url: 'http://dev.tt.smiss.ua/api/teamStatus'
      })
    }
  });




