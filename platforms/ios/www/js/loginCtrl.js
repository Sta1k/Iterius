APP
  .controller('LoginCtrl',
     function ($scope,
      $ionicPlatform,
      $cordovaTouchID,
      data, 
      APIService ,
      $state, 
      dataService, 
      $stateParams) {
        $ionicPlatform.ready(function() {
          $scope.user = {};
          dataService.checkDB().then(function(){
            if(!data.check){
                return false
            }else{
                console.log(data.check);
                $cordovaTouchID.checkSupport()
                  .then(function() {
                    $cordovaTouchID.authenticate("You must authenticate")
                      .then(function() {
                          alert("The authentication was successful");
                          dataService.readDb().then(function(){
                          APIService.login(data.user)
                           .then(function success(response) {
                                console.log(response);
                                dataService.login = data.user;

                                  if (response.data.success) {
                                    APIService.requestTasks()
                                    .then(function success(res) {
                                          if (!res.data.success) {
                                            alert(res.data.error);
                                          } else {
                                            dataService.tasksList = res.data.tasks;
                                            var arr= _.pluck(dataService.tasksList, 'time');
                                            summa = function(m) {
                                              for(var s = 0, k = m.length; k; s += m[--k]);
                                              dataService.AllWorkedTime = s;
                                            };
                                            summa(arr);
                                            console.log(dataService.tasksList);
                                            $state.go('app.tasks');
                                          }

                                    })
                                } else {

                                  alert(response.data.errors.password[0]);

                                }

                          }, function err(res) {
                              console.log(res.status + ' ' + res.statusText);
                          });
                        })
                    }, function(error) {
                        console.log(JSON.stringify(error));
                    });
                  }, function(error) {
                      console.log(JSON.stringify(error));
                  });
          }
        })
      })
      $scope.LogIn = function () {
        // document.getElementById('loginButton').disabled=true;

        APIService.login($scope.user)

          .then(function
            success(response) {
            console.log(response);
            dataService.login = $scope.user;

            if (response.data.success) {
              APIService.requestTasks()
                .then(function success(res) {
                  if (!res.data.success) {

                    alert(res.data.error);

                  } else {
                    dataService.tasksList = res.data.tasks;
                    var arr= _.pluck(dataService.tasksList, 'time');
                    summa = function(m) {
                      for(var s = 0, k = m.length; k; s += m[--k]);
                      dataService.AllWorkedTime = s;
                    };
                    summa(arr);
                    console.log(dataService.tasksList);
                    $state.go('app.tasks');
                  }

                })
            } else {

              alert(response.data.errors.password[0]);

            }

          }, function err(res) {
            console.log(res.status + ' ' + res.statusText);
          });

      }
      
    
  


  
});
