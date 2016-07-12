APP
  .controller('LoginCtrl',
    function ($scope,
              $ionicPlatform,
              $cordovaTouchID,
              $cordovaToast,
              data,
              APIService,
              $state,
              dataService,
              $stateParams,
              $timeout) {
      ionic.Platform.ready(function () {
        $scope.isAndroid = ionic.Platform.isAndroid();
        $scope.user = {};

        dataService.checkRemember();//.then(function (res) {
        $timeout(remember, 1000);
      });

      function remember() {
        $scope.check = data.check;
        console.log($scope.check);
        if ($scope.check == 'on') {
          //$scope.LogIn(data.user)
          $scope.user = data.user
        }

      }

      $scope.LogIn = function (objUser) {
        APIService.login(objUser)
          .then(function
            success(response) {
            console.log(response);
            dataService.login = objUser;

            if (response.data.success) {
              data.user.role = response.data.type;
              console.log(data.user.role);
              if ($scope.user.remember == true && $scope.user.password.length > 6) {
                dataService.rememberMe($scope.user)
              }
              if ($scope.user.remember == false) {
                dataService.delRemember()
              }
              if(data.user.role>0){
                $state.go('app.team', {}, {reload: true});
              }else{
                $state.go('app.tasks', {}, {reload: true});
              }
              


            } else {

              alert(response.data.errors.password[0]);

            }

          }, function err(res) {
            console.log(res.status + ' ' + res.statusText);
          });

      };

      $scope.StartTouch = function () {
        $cordovaTouchID.checkSupport().then(function () {
          $cordovaTouchID.authenticate("You must authenticate").then(function () {
            $cordovaToast.showShortTop('Please wait');
            $timeout(dataService.readDb()).then($timeout(function () {
              $scope.LogIn(data.user)
            },500));
            // success
          }, function () {
            // error
          });
        }, function (error) {
          alert(error); // TouchID not supported
        });

      };//end function

    });



