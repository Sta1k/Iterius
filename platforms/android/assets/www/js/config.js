/**
 * Created by smissltd on 16.05.16.
 */
var APP = angular.module('tt', ['ionic'])//'tt.services'

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
      .state('app.userTasks', {
        url: "/usertask",
        views: {
          'menuContent' :{
            templateUrl: "templates/userTasks.html",
            controller: 'UserTasksCtrl'
          }
        }
      })
      .state('app.curteam', {
        url: "/curteam",
        views: {
          'menuContent' :{
            templateUrl: "templates/curteam.html",
            controller: 'curTeamCtrl'
          }
        }
      })
      .state('app.tasks', {
        url: "/tasks",
        views: {
          'menuContent' :{
            templateUrl: "templates/tasks.html",
            controller: 'TasksCtrl'
          }
        }
      })
      .state('app.order', {
        url: "/order",
        views: {
          'menuContent' :{
            templateUrl: "templates/order.html",
            controller: 'OrderCtrl'
          }
        }
      })


      .state('app.login-into-menucontent', {
        url: "/login-into-menucontent",
        views: {
          'menuContent' :{
            templateUrl: "templates/login.html",
            controller: 'LoginCtrl'
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

