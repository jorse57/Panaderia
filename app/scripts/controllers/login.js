(function () {
  'use strict';
 
  /**
   * @ngdoc function
   * @name proyectoFrontApp.controller:loginCtrl
   * @description
   * # loginCtrl
   * Controller of the proyectoFrontApp
   */
  angular.module('proyectoFrontApp')
    .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['serviceServicio', '$state'];

  function loginCtrl(serviceServicio, $state) {
    var vm = this;

    function login() {
      if (!vm.viewForward) {
        vm.error = false;
        var parametros = {
          correo: vm.correo,
          contrasena: vm.contrasena
        };
        serviceServicio.llamarMetodo('POST', '/usuario/login', parametros)
          .then(successLogin, errorLogin);
      } else {
        var parametros = {
          correo: vm.correo
        };
        serviceServicio.llamarMetodo('POST', '/sendEmailForward', parametros)
          .then(successForward);
      }
    }

    function successLogin(result){
      if (result.status) {
        localStorage.setItem("token_proyecto", result.data.accessToken);
        $state.go("auth.home");
      } else {
        vm.error = true;
      }
    }

    function errorLogin() {
      vm.error = true;
    }

    function successForward(result) {
      vm.msg = result.data
    }

    vm.login = login;
  }
})();