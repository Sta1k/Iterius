angular.module('tt')

  .controller('AppCtrl', function ($scope) {
  })

  .controller('TasksCtrl', function ($scope, dataService) {
    $scope.tasksList = dataService.tasksList;
    
  })
  .controller('TaskCtrl', function ($scope, $stateParams) {
  })
  .controller('CreateCtrl', function ($scope, $stateParams) {
  })
  .controller('TeamCtrl', function ($scope, $stateParams) {
  })
  .controller('SplashController', function ($scope, $stateParams) {
  });

 angular.module('tt')
   .controller('LoginCtrl',
    function ($scope, loginService, taskService, $state,  dataService, $stateParams) {

      $scope.LogIn = function (user) {
        document.getElementById('loginButton').disabled=true;
        
        loginService.sendData(user)
        
          .then(function
            success(response) {
            console.log(response);
            

            if(response.data.success===true){
              taskService.requestData()
                .then(function success(res) {
                  if(!res.data.success){

                    alert(res.data.error);
                    // $state.go('app.tasks');//убрать когда сервер починят
                  }else{
                    dataService.tasksList = res.data.tasks;
                    console.log(dataService.tasksList);
                    $state.go('app.tasks');
                  }

                })
            }else{
              alert('Server error');
              
            }

          }, function err(res) {
            console.log(res.status+' '+res.statusText);
          })
          .finally(function ($stateParams) {
            // $state.go('app.tasks');
           
          })
        ;
        // $state.go('app.tasks');
      };


    });


