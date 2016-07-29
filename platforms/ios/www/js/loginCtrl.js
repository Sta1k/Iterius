APP
  .controller('LoginCtrl',
    function ($scope,
              $rootScope,
              $ionicPlatform,
              $cordovaTouchID,
              $cordovaToast,
              data,
              APIService,
              $state,
              dataService,
              $stateParams,
              $timeout) {
      $timeout(navigator.splashscreen.hide(),2000);
        ionic.Platform.ready(function () {
          
            $scope.isAndroid = ionic.Platform.isAndroid();
          $scope.user = {};

          dataService.checkRemember();//.then(function (res) {
          $timeout(remember, 800);
          function remember() {
            $scope.check = data.check;
            if ($scope.check == 'on') {
              $scope.user=data.user
              // $scope.LogIn(data.user);
            } 
          }
        });
      
      $rootScope.$on('logout', function () {
        $scope.user = undefined;
      });


      $scope.LogIn = function (objUser) {
        APIService.login(objUser)
          .then(function
            success(response) {
            // console.log(response);
            $scope.user=dataService.login = objUser;

            if (response.data.success) {
              data.user.role = response.data.type;
              // console.log(data.user.role);
              if ($scope.user.remember == true && $scope.user.password.length > 6) {
                dataService.rememberMe($scope.user)
              }
              if ($scope.user.remember == false||!$scope.user.remember) {
                dataService.delRemember()
              }
              if (data.user.role > 0) {
                $state.go('app.team', {}, {reload: true});
                // $timeout(navigator.splashscreen.hide(),2000)

              } else {
                $state.go('app.tasks', {}, {reload: true});
                // $timeout(navigator.splashscreen.hide(),2000)
              }


            } else {

              alert(response.data.errors.password[0]);
              $timeout(navigator.splashscreen.hide(),500)
            }

          }, function err(res) {
            console.log(res.status + ' ' + res.statusText);
            
          })

      };

      $scope.StartTouch = function () {
        $cordovaTouchID.checkSupport().then(function () {
          $cordovaTouchID.authenticate("You must authenticate").then(function () {
            $cordovaToast.showShortTop('Please wait');
            $timeout(dataService.readDb()).then($timeout(function () {
              $scope.LogIn(data.user)
            }, 500));
            // success
          }, function () {
            // error
          });
        }, function (error) {
          alert(error); // TouchID not supported
        });

      };//end function

    });



