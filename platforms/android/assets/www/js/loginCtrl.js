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
  ionic.Platform.ready(function(){
     $scope.isAndroid = ionic.Platform.isAndroid();
     $scope.user = {};
     if($scope.isAndroid==false){
       dataService.checkDB().then(function(){
         $scope.check=data.check
         if ($scope.check == 'on'&& $scope.isAndroid==false){
          $cordovaTouchID.checkSupport()
          .then(function() {
   $cordovaTouchID.authenticate("You must authenticate").then(function() {
    alert('touch')
  }, function (error) {
     console.log(JSON.stringify(error))
  });
  }, function (error) {
    alert(error); // TouchID not supported
  });
        }
      })
    }
  })
         


                
      //   $ionicPlatform.ready(function() {
      //     $scope.user = {};
      //     dataService.checkDB().then(function(){
      //       $scope.check=data.check;
      //       if(!data.check){
      //           return false
      //       }else{
      //           console.log(data.check);
      //           $cordovaTouchID.checkSupport()
      //             .then(function() {
      //               console.log('after checksupport');
      //               $cordovaTouchID.authenticate("You must authenticate")})
      //             .then(function() {
      //                     alert("The authentication was successful");
      //                     dataService.readDb().then(function(){
      //                     APIService.login(data.user)
      //                      .then(function success(response) {
      //                           console.log(response);
      //                           dataService.login = data.user;

      //                             if (response.data.success) {
      //                               APIService.requestTasks()
      //                               .then(function success(res) {
      //                                     if (!res.data.success) {
      //                                       alert(res.data.error);
      //                                     } else {
      //                                       dataService.tasksList = res.data.tasks;
      //                                       var arr= _.pluck(dataService.tasksList, 'time');
      //                                       summa = function(m) {
      //                                         for(var s = 0, k = m.length; k; s += m[--k]);
      //                                         dataService.AllWorkedTime = s;
      //                                       };
      //                                       summa(arr);
      //                                       console.log(dataService.tasksList);
      //                                       $state.go('app.tasks');
      //                                     }

      //                               })
      //                           } else {

      //                             alert(response.data.errors.password[0]);

      //                           }

      //                     }, function err(res) {
      //                         console.log(res.status + ' ' + res.statusText);
      //                     });
      //                   })
      //               }, function(error) {
      //                   console.log(JSON.stringify(error));
      //               });
      //             }, function(error) {
      //                 console.log(JSON.stringify(error));
      //             });
      //     }
      //   })
      // })
      $scope.LogIn = function () {
        
        APIService.login($scope.user)

          .then(function
            success(response) {
            console.log(response);
            dataService.login = $scope.user;

            if (response.data.success) {
              
                    $state.go('app.tasks');
                  

                
            } else {

              alert(response.data.errors.password[0]);

            }

          }, function err(res) {
            console.log(res.status + ' ' + res.statusText);
          });

      }
      
    $scope.StartTouch = function(){
      $cordovaTouchID.checkSupport().then(function() {
        dataService.readDb();
        $cordovaTouchID.authenticate("You must authenticate")//.then(function() {
                
                // alert($scope.obj);
                // dataService.readDb();
                  // $scope.user=data.user;})
                                          
        
                                          
        .then(APIService.login(data.user)
         .then(function
            success(response) {
            console.log(response);
            dataService.login = $scope.user;

            if (response.data.success) {
              
                    $state.go('app.tasks');                
            } else {
              alert(response.data.errors.password[0]);
            }

          }, function err(res) {
            console.log(res.status + ' ' + res.statusText);
          }));
                })

            }
      
    
  
               })

  

