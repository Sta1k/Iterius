APP
  .controller('LoginCtrl',
    function ($scope, APIService , $state, dataService, $stateParams) {
      $scope.user = {
        username: "Admin11",
        password: "Admin11",
        remember: true
      };
      $scope.LogIn = function () {
        // document.getElementById('loginButton').disabled=true;

        APIService.login($scope.user)

          .then(function
            success(response) {
            console.log(response);


            if (response.data.success) {
              APIService.requestTasks()
                .then(function success(res) {
                  if (!res.data.success) {

                    alert(res.data.error);

                  } else {
                    dataService.tasksList = res.data.tasks;
                    var arr= _.pluck(dataService.tasksList, 'time');
                    summa = function(m) {
                      for(var s = 0, k = m.length; k; s += m[--k]);
                      dataService.AllWorkedTime = s;
                    };
                    summa(arr);
                    console.log(dataService.tasksList);
                    $state.go('app.tasks');
                  }

                })
            } else {

              alert(response.data.errors.password[0]);

            }

          }, function err(res) {
            console.log(res.status + ' ' + res.statusText);
          });

      };
    });
