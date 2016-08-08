APP
  .controller('AppCtrl', function ($scope,$ionicPlatform,$translate,$rootScope,$state,dataService,data, $stateParams, $cordovaVibration,APIService) {
    $scope.role = data.user.role;
    // $scope.$watch(function () {
    //   return data.user.role
    // }, function (newValue) {
    //   $scope.role = newValue
    // }, true);
    $scope.tasks = function () {
      APIService.requestTasks().then(
        function (res) {
          $state.go('app.tasks', {}, {reload: true})
        })
    };
    $scope.team = function () {
      $state.go('app.team',{},{reload:true})
    };
    $scope.createTask = function () {
      $state.go('app.create',{},{reload:true})
    };
    $scope.pref = function () {
      $state.go('app.pref',{},{reload:true})
    };
    $scope.stat = function () {
      $state.go('app.stat',{},{reload:true})
    };
    $scope.logout = function () {
      APIService.logout().then(
        function (res) {
          $rootScope.$broadcast("logout");
          console.log(res);
          $cordovaVibration.vibrate(50);
          $state.go('login', {}, {reload: true})
        })
    };

    $ionicPlatform.ready(function () {
      if (typeof navigator.globalization !== "undefined") {
        navigator.globalization.getPreferredLanguage(function (language) {
          $translate.use((language.value).split("-")[0]).then(function (data) {

            console.log("SUCCESS -> " + data);
          }, function (error) {
            console.log("ERROR -> " + error);
          });
        }, null);
      }
    })

  });
