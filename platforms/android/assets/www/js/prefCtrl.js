APP
  .controller('PrefCtrl',
    function ($scope,
              $state,
              $ionicPlatform,
              dataService,
              data,
              $translate,
              $cordovaToast,
              $cordovaTouchID,
              $timeout,
              $stateParams) {
      $ionicPlatform.ready(function () {
        console.log('PrefCtrl');
        $timeout(dataService.checkFinger()).then(function (res) {
          console.log(res);
          $scope.checkbox = res == true ? true : false;
          console.log($scope.checkbox)
        });
        $scope.timeCount = dataService.AllWorkedTime;
        $scope.showState = function () {
          if($scope.checkbox==false){

            $scope.buttonON()
          }else{
            $scope.checkbox=false;
            $scope.buttonOff()
          }
        };
        $translate('touch_mes').then(function (result) {
          $scope.mes = result;
        });
        $translate('touch_mes2').then(function (result) {
          $scope.mes2 = result;
        });
        $translate('touch_mes3').then(function (result) {
          $scope.mes3 = result;
        });
        $scope.buttonON = function () {
          $cordovaTouchID.checkSupport().then(function () {
            $cordovaTouchID.authenticate($scope.mes).then(function () {
              $scope.obj = dataService.login;
              $scope.obj.touch=true;
              dataService.writeDB($scope.obj);
              $scope.checkbox=true;
              $cordovaToast.showShortTop($scope.mes2);


            }, function (error) {
              console.log(JSON.stringify(error));
            });
          })
        };
        $scope.buttonOff = function () {
          dataService.DBoff();
          $cordovaToast.showShortTop($scope.mes3);
        };
        $scope.tasks = function () {
          $state.go('app.tasks', {}, {reload: true});
        };
      })
    });
