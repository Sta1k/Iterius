APP
  .controller('StatCtrl', function ($scope, $state, $cordovaToast,data, $ionicNavBarDelegate, dataService, APIService, $stateParams) {
    APIService.Statistic().then(function(res){

      $scope.userStatList = res.data.data;
      console.log($scope.userStatList);
    });
    $scope.query={
      user:'',
      year:'',
      month:''
    };
    $scope.years=[2016,2015,2014];
    $scope.months=[
      {id:1,name:'January'},
      {id:2,name:'February'},
      {id:3,name:'March'},
      {id:4,name:'April'},
      {id:5,name:'May'},
      {id:6,name:'June'},
      {id:7,name:'July'},
      {id:8,name:'August'},
      {id:9,name:'September'},
      {id:10,name:'October'},
      {id:11,name:'November'},
      {id:12,name:'December'}
    ];
  $scope.runQuery=function () {
    if($scope.query.user!==''&&$scope.query.year!==''&&$scope.query.month!==''){
      APIService.Statistic($scope.query).then(function(res){
        console.log(res);
        $scope.answer=res.data.data;
        console.log($scope.answer);
        $scope.result=$scope.answer[$scope.query.user];//_.findWhere($scope.answer,{id:$scope.query.user});
$scope.
        console.log($scope.result)
      })
    }
  }




  });
