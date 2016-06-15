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
    $scope.buttonON = function () {
      
        $cordovaTouchID.authenticate("Please authenticate with your fingerprint!")
          .success(function(res) {
            console.log(res)
            $scope.obj=dataService.login;
            console.log($scope.obj);
            dataService.writeDB($scope.obj)
          }, function (error) {
            if (error == "Fallback authentication mechanism selected.") {
            // User selected to enter a password 
        } else {
            alert("Sorry, we are not able to grant access.");
        }
    })};
    $scope.buttonOff = function () {
       dataService.DBoff()
    }
    $scope.check=function () {
      dataService.checkDB()
    }
    $scope.write=function () {
      $scope.obj=dataService.login;
            console.log($scope.obj);
            dataService.writeDB($scope.obj)
    }
    
      })})    
