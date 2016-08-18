APP
  .controller('SplashCtrl',
    function ($scope,
              $rootScope,
              $ionicPlatform,
              $cordovaTouchID,
              $cordovaToast,
              $translate,
              data,
              APIService,
              $state,
              dataService,
              $stateParams,
              $timeout) {
      $scope.$on('$ionicView.loaded', function () {
        ionic.Platform.ready(function () {
          $scope.isAndroid = ionic.Platform.isAndroid();
          $scope.user = {};

          dataService.checkRemember();
          $timeout(checkStatus, 800);
          function checkStatus() {

            if (data.user.finger !== undefined && data.user.finger == 'true') {

              $state.go('finger', {}, {reload: true});
            }
            else if (data.check == 'true') {
              $scope.user = data.user;
              $scope.user.remember = true;
              $scope.LogIn(data.user);
            }
            else {
              console.log('data not found');
              $state.go('login', {}, {reload: true});
            }
          }
        });

        $rootScope.$on('logout', function () {
          $scope.user = undefined;
        });

        $translate('incorrect_login').then(function (result) {
          $scope.mes = result;
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
                if ($scope.user.remember == true && $scope.user.password.length > 6) {
                  dataService.writeDB($scope.user)
                }
                if ($scope.user.remember == false || !$scope.user.remember) {
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

                $cordovaToast.showShortTop($scope.mes);
                navigator.splashscreen.hide();
                $state.go('login', {}, {reload: true});
              }

            }, function err(res) {
              console.log(res.status + ' ' + res.statusText);
              navigator.splashscreen.hide();
              $state.go('login', {}, {reload: true});
            })

        };
      });
    });
