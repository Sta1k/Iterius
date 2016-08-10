/**
 * Created by smissltd on 16.05.16.
 */
var APP;
APP = angular.module('tt', ['ionic', 'ngCordova', 'pascalprecht.translate'])//'tt.services'
  .config(function ($compileProvider, $ionicConfigProvider, $translateProvider) {
      $ionicConfigProvider.views.swipeBackEnabled(false);
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
      $translateProvider.translations('en', {
        menu_tasks: 'My Tasks',
        menu_status_of_team: 'Status of team',
        menu_create: 'Create task',
        menu_pref: 'Settings',
        menu_stat: 'Statistic',
        menu_logout: 'Logout',
        teams: 'Teams',
        user_login:'User login',
        password:'Password',
        error1:'Please fill in login',
        error2:'Login is too short',
        error3:'Login is too long',
        error4:'Special simbols not allowed',
        error5:'Please fill in password',
        error6:'Password is too short',
        error7:'Password is too long',
        error8:'Special simbols not allowed',
        login_button:'LOG IN',
        remember_me:'Remember me',
        sum_hours:'Sum of hours per month: ',
        underworked:'Underworked:',
        overworked:'Overworked',
        sum_issue:'Sum of hours per month (Issue Tracker):',
        date:'Date',
        day:'Day of week',
        time:'Total time',
        break:'Break',
        search_button:'Search',
        login_touchid:'Login with TouchID',
        phrase_touchid:'For use touchID please swipe left on Login Screen',
        edit_button:'Edit',
        delete_button:'Delete',
        stat_user:'User:',
        stat_year:'Year:',
        stat_month:'Month',
        create_title:'Title: *',
        create_desc:'Description',
        create_err1:'Task "Title" is required',
        create_err2:'Title is too short',
        create_err3:'Title is too long',
        create_assign:' Assign: *',
        create_assign1:'Not associate',
        create_assign2:'Associated with project',
        create_assign3:'Associated with task',
        clear:'Clear'
        
        
      });
      $translateProvider.translations('ru', {
        menu_tasks: 'Мои задачи',
        menu_status_of_team: 'Статус команды',
        menu_create: 'Создать задачу',
        menu_pref: 'Настройки',
        menu_stat: 'Статистика',
        menu_logout: 'Выход',
        teams: 'Список команд',
        user_login:'Имя пользователя',
        password:'Пароль',
        error1:'Пожалуйста введите имя пользователя',
        error2:'Имя пользователя слишком короткое',
        error3:'Имя пользователя слишком длинное',
        error4:'Спецсимволы не разрешены',
        error5:'Введите пароль',
        error6:'Пароль слишком короткий',
        error7:'Пароль слишком длинный',
        error8:'Спецсимволы не разрешены',
        login_button:'ВХОД',
        remember_me:'Запомнить меня',
        sum_hours:'Сумма отработанных часов за месяц',
        underworked:'Недоработка:',
        overworked:'Переработка:',
        sum_issue:'Сумма отработанных часов за месяц(Issue Tracker):',
        date:'Дата',
        day:'День недели',
        time:'Время',
        break:'Перерыв',
        search_button:'Поиск',
        login_touchid:'Вход с помощью TouchID',
        phrase_touchid:'Для использования TouchID свайпните влево по экрану на странице Логина',
        edit_button:'Редактировать',
        delete_button:'Удалить',
        stat_user:'Пользователь:',
        stat_year:'Год:',
        stat_month:'Месяц',
        create_title:'Имя задачи: *',
        create_desc:'Описание',
        create_err1:'Имя задачи обязательно',
        create_err2:'Имя задачи сликом короткое',
        create_err3:'Имя задачи сликом длинное',
        create_assign:' Назначить: *',
        create_assign1:'Не ассоциировать',
        create_assign2:'Ассоциировать с проектом',
        create_assign3:'Ассоциировать с задачей',
        clear:'Очистить'
      });
      $translateProvider.translations('de', {});
      $translateProvider.preferredLanguage('en');
      $translateProvider.fallbackLanguage('en')
    })
  .config(function ($stateProvider, $urlRouterProvider) {

      $stateProvider

        .state('app', {
          url: "/app",
          abstract: true,
          templateUrl: "templates/menu.html",
          controller: 'AppCtrl'
        })


        .state('app.create', {
          url: "/create",
          cache: false,
          views: {
            'menuContent': {
              templateUrl: "templates/create.html",
              controller: 'CreateCtrl'
            }
          }
        })
        .state('app.create/:id', {
          url: "/create/:id",
          cache: false,
          views: {
            'menuContent': {
              templateUrl: "templates/create.html",
              controller: 'EditCtrl'
            }
          }
        })
        .state('app.team', {
          url: "/team",
          views: {
            'menuContent': {
              templateUrl: "templates/team.html",
              controller: 'TeamCtrl'
            }
          }
        })
        .state('app.userTasks/:id', {
          url: "/usertask/:id",
          cache: false,
          views: {
            'menuContent': {
              templateUrl: "templates/userTasks.html",
              controller: 'UserTasksCtrl'
            }
          }
        })
        .state('app.curteam/:teamId', {
          url: "/curteam/:teamId",
          cache: false,
          views: {
            'menuContent': {
              templateUrl: "templates/curteam.html",
              controller: 'curTeamCtrl'
            }
          }
        })
        .state('app.stat', {
          // abstract:true,
          cache: false,
          url: "/statistic/",
          views: {
            'menuContent': {
              templateUrl: "templates/stat.html",
              controller: 'StatCtrl'
            }
          }
        })
        .state('app.tasks', {
          // abstract:true,
          cache: false,
          url: "/tasks/",
          views: {
            'menuContent': {
              templateUrl: "templates/tasks.html",
              controller: 'TasksCtrl'
            }
          }
        })
        .state('app.tasks/:orderId', {
          cache: false,
          //parent:'app.tasks',
          //abstract:true,
          url: "/tasks/:orderId",
          views: {
            'menuContent': {
              templateUrl: "templates/order.html",
              controller: 'OrderCtrl'
            }
          }
        })


        .state('app.pref', {
          url: "/pref",
          views: {
            'menuContent': {
              templateUrl: "templates/pref.html",
              controller: 'PrefCtrl'
            }
          }
        })

        .state('splash', {
          url: "/splash",
          templateUrl: "templates/splash.html",
          controller: 'SplashCtrl'
        })
        .state('finger', {
          url: "/finger",
          templateUrl: "templates/splash.html",
          controller: 'FingerCtrl'
        })
        .state('login', {
          url: "/login",
          templateUrl: "templates/login.html",
          controller: 'LoginCtrl'
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/splash');

  })
  .run(function ($ionicPlatform, $translate) {
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


