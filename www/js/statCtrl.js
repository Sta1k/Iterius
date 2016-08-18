APP
  .controller('StatCtrl', function ($scope, $state, $cordovaToast, data, dataService, APIService, $stateParams) {
    $scope.timeCount = dataService.AllWorkedTime;
    APIService.Statistic().then(function (res) {

      $scope.userStatList = res.data.data;
      console.log($scope.userStatList);
    });
    $scope.tasks = function () {
      $state.go('app.tasks', {}, {reload: true});
    };
    $scope.query = {
      user: '',
      year: '',
      month: ''
    };
    if (dataService.lang == 'ru') {
      $scope.months = [
        {id: 1, name: 'Январь'},
        {id: 2, name: 'Февраль'},
        {id: 3, name: 'Март'},
        {id: 4, name: 'Апрель'},
        {id: 5, name: 'Май'},
        {id: 6, name: 'Июнь'},
        {id: 7, name: 'Июль'},
        {id: 8, name: 'Август'},
        {id: 9, name: 'Сентябрь'},
        {id: 10, name: 'Октябрь'},
        {id: 11, name: 'Ноябрь'},
        {id: 12, name: 'Декабрь'}
      ];
    } else {
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
    }
    $scope.years = [2016, 2015, 2014];

    $scope.runQuery = function () {
      if ($scope.query.user !== '' && $scope.query.year !== '' && $scope.query.month !== '') {
        $scope.busy = $scope.table = true;
        $scope.iter = $scope.differ = 0;
        APIService.Statistic($scope.query).then(function (res) {
          console.log(res);
          $scope.answer = res.data.data[0];
          $scope.sumOfHours = _.compact(_.pluck($scope.answer.user.days, 'time'));
          console.log($scope.sumOfHours);
          $scope.iter = $scope.sumOfHours.reduce(function (sum, cur) {
            return Number(sum) + Number(cur)
          });
          $scope.differ = $scope.answer.user.working_hours - $scope.iter;
          console.log($scope.iter)
        }).finally(function () {

          $scope.busy = false
        })
      }
    };


  });
