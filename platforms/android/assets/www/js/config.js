/**
 * Created by smissltd on 16.05.16.
 */
var APP = angular.module('tt', ['ionic','ngCordova'])//'tt.services'
  .config(function($compileProvider) {

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
  })
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
      })



      .state('app.create', {
        url: "/create",
        views: {
          'menuContent' :{
            templateUrl: "templates/create.html",
            controller: 'CreateCtrl'
          }
        }
      })

      .state('app.team', {
        url: "/team",
        views: {
          'menuContent' :{
            templateUrl: "templates/team.html",
            controller: 'TeamCtrl'
          }
        }
      })
      .state('app.userTasks/:id', {
        url: "/usertask/:id",
        views: {
          'menuContent' :{
            templateUrl: "templates/userTasks.html",
            controller: 'UserTasksCtrl'
          }
        }
      })
      .state('app.curteam/:teamId', {
        url: "/curteam/:teamId",
        views: {
          'menuContent' :{
            templateUrl: "templates/curteam.html",
            controller: 'curTeamCtrl'
          }
        }
      })
      .state('app.tasks', {
       // abstract:true,
        //parent:'app',
        url: "/tasks/",
        views: {
          'menuContent' :{
            templateUrl: "templates/tasks.html",
            controller: 'TasksCtrl'
          }
        }
      })
      .state('app.tasks/:orderId', {
        //parent:'app.tasks',
        //abstract:true,
        url: "/tasks/:orderId",
        views: {
          'menuContent' :{
            templateUrl: "templates/order.html",
            controller: 'OrderCtrl'
          }
        }
      })


      .state('app.pref', {
        url: "/pref",
        views: {
          'menuContent' :{
            templateUrl: "templates/pref.html",
            controller: 'PrefCtrl'
          }
        }
      })

      .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: 'LoginCtrl'
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

  });

