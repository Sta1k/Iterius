APP
  .controller('LoginCtrl',
     function ($scope,
               $ionicPlatform,
               $cordovaTouchID,
               data,
               APIService ,
               $state,
               dataService,
               $stateParams,
               $timeout) {
  ionic.Platform.ready(function(){
     $scope.isAndroid = ionic.Platform.isAndroid();
     $scope.user = {};
     if($scope.isAndroid==false){
       dataService.checkDB().then(function(){
         $scope.check=data.check
         if ($scope.check == 'on'&& $scope.isAndroid==false){
          
        }
      })
    }
  })
         

      $scope.LogIn = function (objUser) {
        
        APIService.login(objUser)

          .then(function
            success(response) {
            console.log(response);
            dataService.login = objUser;

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
    $cordovaTouchID.authenticate("You must authenticate").then(function() {
      $timeout(dataService.readDb()).then(function() {
        $scope.LogIn(data.user)
      },function (error) {
        alert('error DB')
      })
    // success
  }, function () {
    // error
  });
  }, function (error) {
    alert(error); // TouchID not supported
  });
      // success(//function() {
    
      //   $cordovaTouchID.authenticate("You must authenticate")
      //   .success(dataService.readDb)
                                         
      //   .success(APIService.login(data.user))
      //    .success(function (response) {
      //       console.log(response);
      //       dataService.login = data.user;
            

      //       if (response.data.success) {
              
      //               $state.go('app.tasks');                
      //       } else {
      //         alert(response.data.errors.password[0]);
      //       }

      //     }, function err(res) {
      //       console.log(res.status + ' ' + res.statusText);
      //     }))
      }//end function 

               })

  

