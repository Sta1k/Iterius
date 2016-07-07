APP
  .controller('LoginCtrl',
    function ($scope,
              $ionicPlatform,
              $cordovaTouchID,
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
              if ($scope.user.remember == true && $scope.user.password.length > 6) {
                dataService.rememberMe($scope.user)
              }
              if ($scope.user.remember == false) {
                dataService.delRemember()
              }
              $state.go('app.tasks', {}, {reload: true});


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
            $timeout(dataService.readDb()).then(function () {
              $scope.LogIn(data.user)
            }, function (error) {
              alert('error DB')
            });
            // success
          }, function () {
            // error
          });
        }, function (error) {
          alert(error); // TouchID not supported
        });

      };//end function

    });



