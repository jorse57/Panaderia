'use strict';

/**
 * @ngdoc overview
 * @name proyectoFrontApp
 * @description
 * # proyectoFrontApp
 *
 * Main module of the application.
 */
angular
  .module('proyectoFrontApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ]);
// .config(function ($routeProvider) {
//   $routeProvider
//     .when('/signin', {
//       templateUrl: 'views/signin.html',
//       controller: 'SigninCtrl',
//       controllerAs: 'sig'
//     })
//     .when('/', {
//       templateUrl: 'views/main.html',
//       controller: 'MainCtrl',
//       controllerAs: 'main'
//     })
//     .otherwise({
//       redirectTo: '/'
//     });
// });

angular
  .module('proyectoFrontApp')
  .run([
    '$rootScope',
    '$state',
    function ($rootScope, $state) {
      $rootScope.urlBack = 'http://localhost:1337';
      //event that listen when state changes
      $rootScope.$on('$stateChangeSuccess', function () {
        var currentState = $state.current.name;
        if (currentState === 'login' || currentState === 'forwardPassword') {
          $rootScope.isLogin = true;
        } else {
          $rootScope.isLogin = false;
        }
        var token = localStorage.getItem('token_proyecto');
        if (!token) {
          if (!$rootScope.isLogin) {
            $state.go('login');
          }
        }
      });
    }]);
