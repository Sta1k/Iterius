/**
 * Created by smissltd on 16.05.16.
 */
var APP;
APP = angular.module('tt', ['ionic', 'ngCordova', 'pascalprecht.translate'])//'tt.services'
  .config(function ($compileProvider, $ionicConfigProvider, $translateProvider) {
      $ionicConfigProvider.views.swipeBackEnabled(false);
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
      $translateProvider.translations('en', {
        user:'User',
        start:'Start',
        end:'End',
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
        error4:'Special symbols not allowed',
        error5:'Please fill in password',
        error6:'Password is too short',
        error7:'Password is too long',
        error8:'Special symbols not allowed',
        login_button:'LOG IN',
        remember_me:'Remember me',
        sum_hours:'Sum of hours per month: ',
        underworked:'Underworked:',
        overworked:'Overworked:',
        sum_issue:'Sum of hours per month (Issue Tracker):',
        date:'Date',
        day:'Day of week',
        time:'Total time',
        break:'Break',
        search_button:'Search',
        login_touchid:'Login with TouchID',
        phrase_touchid:'To use touchID please swipe left on Login Screen',
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
        clear:'Clear',
        edit_task:'Edit Task',
        task_edited:'Task edited',
        create_button:'Create',
        create_head:'Create Task',
        create_mes:'Task created',
        please_wait:'Please wait...',
        task_start:'Task started',
        task_stop:'Task stopped',
        touch_mes:'You must authenticate',
        touch_mes2:'Now you may login with fingerprint',
        touch_mes3:'Fingerprint auth turned off',
        delete_popup:'Delete this Task',
        delete_popup2:'Are you sure you want to delete this Task?',
        incorrect_login:'Incorrect login or password',
        server_error:'Server Error'


      });
      $translateProvider.translations('ru', {
        user:'Пользователь',
        start:'Начало',
        end:'Конец',
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
        sum_hours:'Сумма часов за месяц:',
        underworked:'Недоработка:',
        overworked:'Переработка:',
        sum_issue:'Сумма часов за месяц(Issue Tracker):',
        date:'Дата',
        day:'День недели',
        time:'Время',
        break:'Перерыв',
        search_button:'Поиск',
        login_touchid:'Вход с помощью TouchID',
        phrase_touchid:"Для использования авторизации по отпечатку пальца, активируйте функцию \"Вход с помощью TouchID\"",
        edit_button:'Редактировать',
        delete_button:'Удалить',
        stat_user:'Пользователь:',
        stat_year:'Год:',
        stat_month:'Месяц:',
        create_title:'Имя задачи: *',
        create_desc:'Описание',
        create_err1:'Имя задачи обязательно',
        create_err2:'Имя задачи сликом короткое',
        create_err3:'Имя задачи сликом длинное',
        create_assign:' Назначить: *',
        create_assign1:'*Без ассоциации',
        create_assign2:'Ассоциировать с проектом',
        create_assign3:'Ассоциировать с задачей',
        clear:'Очистить',
        edit_task:'Редактировать задачу',
        task_edited:'Задача отредактирована',
        create_button:'Создать',
        create_head:'Создать задачу',
        create_mes:'Задача создана',
        please_wait:'Пожалуйста подождите',
        task_start:'Задача запущена',
        task_stop:'Задача остановлена',
        touch_mes:'Пожалуйста, используйте отпечаток пальца для проверки',
        touch_mes2:'Теперь вы можете залогиниться по отпечатку пальца',
        touch_mes3:'Авторизация отпечатком пальца выключена',
        delete_popup:'Удалить задачу',
        delete_popup2:'Вы уверены что хотите удалить эту задачу?',
        incorrect_login:'Неверный логин или пароль',
        server_error:'Серверная ошибка'
      });
      $translateProvider.translations('de', {
        user:'Benutzer',
        start:'Anfang',
        end:'Ende',
        menu_tasks: 'Meine Aufgaben',
        menu_status_of_team: 'Teamstatus',
        menu_create: 'Aufgabe erstellen',
        menu_pref: 'Einstellungen',
        menu_stat: 'Statistik',
        menu_logout: 'Logout',
        teams: 'Abmelden',
        user_login:'Benutzername',
        password:'Passwort',
        error1:'Bitte geben Sie den Benutzernamen ein',
        error2:'Der Benutzername ist zu kurz',
        error3:'Der Benutzername ist zu lang',
        error4:'Spezialsymbole werden nicht zugelassen',
        error5:'Bitte geben Sie das Passwort ein',
        error6:'Das Passwort ist zu kurz',
        error7:'Das Passwort ist zu lang',
        error8:'Spezialsymbole werden nicht zugelassen',
        login_button:'Anmelden',
        remember_me:'Angemeldet bleiben',
        sum_hours:'Die Summe von Stunden pro Monat ',
        underworked:'Unterarbeitung',
        overworked:'Überarbeitung',
        sum_issue:'Die Summe von Stunden pro Monat (Issue Tracker):',
        date:'Datum',
        day:'Wochentag',
        time:'Gesamtzeit',
        break:'Pause',
        search_button:'Suche',
        login_touchid:'Anmelden mit TouchID',
        phrase_touchid:'Um touchID zu verwenden bitte auf dem Anmdelungsbildschirm nach links krallen(?)',
        edit_button:'Bearbeiten',
        delete_button:'Löschen',
        stat_user:'Benutzer:',
        stat_year:'Jahr:',
        stat_month:'Monat',
        create_title:'Titel: *',
        create_desc:'Beschreibung',
        create_err1:'Bitte geben Sie den Aufgabentitel ein',
        create_err2:'Der Aufgabentitel ist zu kurz',
        create_err3:'Der Aufgabentitel ist zu lang',
        create_assign:'Zuordnen: *',
        create_assign1:'Nicht zugeordnet',
        create_assign2:'Einem Projekt zugeordnet',
        create_assign3:'Einer Aufgabe zugeordnet',
        clear:'Klären',
        edit_task:'Aufgabe bearbeiten',
        task_edited:'Die Aufgabe wurde bearbeitet',
        create_button:'Erstellen',
        create_head:'Aufgabe erstellen',
        create_mes:'Die Aufgabe wurde erstellt',
        please_wait:'Bitte warten Sie...',
        task_start:'Die Aufgaben wurde gestartet',
        task_stop:'Die Aufgaben wurde gestoppt',
        touch_mes:'Die müssen angemeldet sein',
        touch_mes2:'Jetzt können Sie Sich mit einem Fingerabdruck anmelden',
        touch_mes3:'Die Fingerabdruckanmeldung wurde abgeschaltet',
        delete_popup:'Diese Aufgabe löschen',
        delete_popup2:'Wollen Sie wirklich diese Aufgabe löschen?',
        incorrect_login:'Der Benutzername oder das Passwort stimmt nicht',
        server_error:'Serverfehler'
      });
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
  .run(function ($ionicPlatform, $translate,dataService) {
    $ionicPlatform.ready(function () {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      }
      if (typeof navigator.globalization !== "undefined") {
        navigator.globalization.getPreferredLanguage(function (language) {
          $translate.use((language.value).split("-")[0]).then(function (data) {
            dataService.lang=data;
            console.log(dataService.lang);
          }, function (error) {
            console.log("ERROR -> " + error);
          });
        }, null);
      }
    })
  });


