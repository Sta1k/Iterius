/**
 * Created by smissltd on 16.05.16.
 */
var APP = angular.module('tt', ['ionic', 'ngCordova'])//'tt.services'
  .config(function ($compileProvider,$ionicConfigProvider) {
    $ionicConfigProvider.views.swipeBackEnabled(false);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
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
        cache:false,
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

  });

