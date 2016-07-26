APP
  .service('APIService', function ($http, $httpParamSerializerJQLike) {
    var url = 'http://dev.tt.smiss.ua/api/';
    this.login = function (request) {//loginService.sendData to APIService.login
      // console.log(request);
      var login = {
        model: {
          username: request.username,
          password: request.password,
          remember: request.remember || false
        }
      };
      return $http({
        method: 'POST',
        url: url+'login',
        data: $httpParamSerializerJQLike(login),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
    };
    this.requestTasks = function () {//taskService.requestData заменить на APIService.requestTasks
      // console.log(req);
      return $http({
        method: 'POST',
        url: url+'tasks'
      });
    };
    this.toggleState = function (id) {//taskToggle.toggleState to APIService.toggleState
      return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'POST',
        data: $httpParamSerializerJQLike({id: id}),
        // permissions: ['http://172.16.3.141/'],
        url: url+'toggle'
      })
    };
    this.TaskCreate = function (object) {//createTask.TaskCreate to APIService.TaskCreate

      // console.log(req);
      return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'POST',
        data: $httpParamSerializerJQLike({
          title: object.title,
          description: object.desc,
          task_id: object.id||undefined
        }),
        url: url+'createTask'
      })
    };
    this.logout=function () {
      return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'POST',
        data: $httpParamSerializerJQLike({
          //data
        }),
        url: url+'logout'
      })
    };
    this.teamStatus = function () {
      return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'POST',
        data: $httpParamSerializerJQLike({
         //data
        }),
        url: url+'teamStatus'
      })
    };
    this.requestUserTasks = function (id) {
      // console.log(req);
      return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: $httpParamSerializerJQLike({
          user: id
        }),
        method: 'POST',
        url: url+'tasks'
      });
    };
    this.TaskUpdate = function (object) {//createTask.TaskCreate to APIService.TaskCreate

      // console.log(req);
      return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'POST',
        data: $httpParamSerializerJQLike({
          id:object.id
        }),
        url: url+'getTaskModel'
      })
    };
    this.TaskDelete = function (object) {//createTask.TaskCreate to APIService.TaskCreate

      // console.log(req);
      return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'POST',
        data: $httpParamSerializerJQLike({
          id:object.id
        }),
        url: url+'deleteTask'
      })
    };
  });




