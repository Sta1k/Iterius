APP
  .controller('PrefCtrl',
    function ($scope,
              $ionicPlatform,
              dataService,
              data,
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
        // $scope.$watch('checkbox',function () {
        //   if($scope.checkbox==true){
        //    
        //   }
        // });
        $scope.showState = function () {
          if($scope.checkbox==false){
            
            $scope.buttonON()
          }else{
            $scope.checkbox=false;
            $scope.buttonOff()
          }
        };
        $scope.buttonON = function () {
          $cordovaTouchID.checkSupport().then(function () {
            $cordovaTouchID.authenticate("You must authenticate").then(function () {
              $scope.obj = dataService.login;
              $scope.obj.touch=true;
              dataService.writeDB($scope.obj);
              $scope.checkbox=true;
              $cordovaToast.showShortTop('Now You may login with fingerprint');
              

            }, function (error) {
              console.log(JSON.stringify(error));
            });
          })
        };
        $scope.buttonOff = function () {
          dataService.DBoff();
          $cordovaToast.showShortTop('Fingerprint auth turned off');
        }
        $scope.check = function () {
          dataService.readDb()
        }
        $scope.write = function () {
          $scope.obj = dataService.login;
          console.log($scope.obj);
          dataService.writeDB($scope.obj)
        }

      })
    });    
