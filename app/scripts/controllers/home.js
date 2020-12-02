(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name proyectoFrontApp.controller:HomeCtrl
   * @description
   * # HomeCtrl
   * Controller of the proyectoFrontApp
   */
  angular.module('proyectoFrontApp')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['serviceServicio', '$state'];

  function HomeCtrl(serviceServicio, $state) {
    var vm = this;

    vm.cerrarSesion = cerrarSesion;

    function cerrarSesion() {
      localStorage.removeItem('token_proyecto')
      $state.go('login');
    }

    function quienEstaEnSesion() {
      serviceServicio.llamarMetodo('GET', '/usuario/login')
        .then(successLogin);
    }

    function successLogin(result) {
      vm.user = result.data;
    }

    quienEstaEnSesion();
  }
})();