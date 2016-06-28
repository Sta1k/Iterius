APP
  .controller('PrefCtrl',
   function (
   $scope,
   $ionicPlatform, 
   dataService, 
   $cordovaTouchID, 
   $interval,
   $stateParams) {
      $ionicPlatform.ready(function() {
    console.log('PrefCtrl');
    $scope.checkbox={};
    $scope.showState= function () {
      console.log($scope.checkbox)
    }
    $scope.buttonON = function () {
      $cordovaTouchID.checkSupport().then(function() {
            $cordovaTouchID.authenticate("You must authenticate").then(function() {
                $scope.obj=dataService.login;
                alert($scope.obj);
                dataService.writeDB($scope.obj)

            }, function(error) {
                console.log(JSON.stringify(error));
            });
      })
    };
    $scope.buttonOff = function () {
       dataService.DBoff()
    }
    $scope.check=function () {
      dataService.readDb()
    }
    $scope.write=function () {
      $scope.obj=dataService.login;
            console.log($scope.obj);
            dataService.writeDB($scope.obj)
    }
    
      })})    
