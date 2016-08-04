APP
  .controller('FingerCtrl',
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
      $scope.$on('$ionicView.loaded', function () {
        ionic.Platform.ready(function () {

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

          $scope.LogIn = function (objUser) {
            APIService.login(objUser)
              .then(function
                success(response) {
                // console.log(response);
                $scope.user = dataService.login = objUser;

                if (response.data.success) {
                  data.user.role = response.data.type;
                  // console.log(data.user.role);
                  if (data.user.role > 0) {
                    $state.go('app.team', {}, {reload: true});
                    // $timeout(navigator.splashscreen.hide(),2000)

                  } else {
                    $state.go('app.tasks', {}, {reload: true});
                    // $timeout(navigator.splashscreen.hide(),2000)
                  }

                } else {

                  alert(response.data.errors.password[0]);
                  navigator.splashscreen.hide();
                }

              }, function err(res) {
                console.log(res.status + ' ' + res.statusText);
                navigator.splashscreen.hide();
                $state.go('login', {}, {reload: true});
              })

          };
        })
      })
    });
