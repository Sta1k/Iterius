APP
  .controller('StatCtrl', function ($scope, $state, $cordovaToast, data,  dataService, APIService, $stateParams) {
    $scope.timeCount = dataService.AllWorkedTime;
    APIService.Statistic().then(function (res) {

      $scope.userStatList = res.data.data;
      console.log($scope.userStatList);
    });

    $scope.query = {
      user: '',
      year: '',
      month: ''
    };
    $scope.years = [2016, 2015, 2014];
    $scope.months = [
      {id: 1, name: 'January'},
      {id: 2, name: 'February'},
      {id: 3, name: 'March'},
      {id: 4, name: 'April'},
      {id: 5, name: 'May'},
      {id: 6, name: 'June'},
      {id: 7, name: 'July'},
      {id: 8, name: 'August'},
      {id: 9, name: 'September'},
      {id: 10, name: 'October'},
      {id: 11, name: 'November'},
      {id: 12, name: 'December'}
    ];
    $scope.runQuery = function () {
      if ($scope.query.user !== '' && $scope.query.year !== '' && $scope.query.month !== '') {
        $scope.busy = true;
        APIService.Statistic($scope.query).then(function (res) {
          console.log(res);
          $scope.answer = res.data.data[0];
          $scope.sumOfHours = _.compact(_.pluck($scope.answer.user.days, 'time'));
          console.log($scope.sumOfHours);
          $scope.iter = $scope.sumOfHours.reduce(function (sum, cur) {
            return Number(sum) + Number(cur)
          });
          console.log($scope.iter)
        }).finally(function () {
          $scope.busy = false
        })
      }
    };
//     $scope.sumOfHours =_.pluck($scope.result,'days')
// var a=$scope.sumOfHours.reduce(function (sum,cur) {
//   return
// })

  });
