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

  HomeCtrl.$inject = ['serviceServicio', '$state', '$scope'];

  function HomeCtrl(serviceServicio, $state, $scope) {
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
    $scope
    function successLogin(result) {
      vm.user = result.data;
    }
    
    function getProductoStockMin() {
      serviceServicio.llamarMetodo('GET', '/producto/getProductoStockMin')
        .then(successGetProductoStockMin);
    }

    function successGetProductoStockMin(result) {
      if (result.status) vm.productos = result.data.productos
    }

    quienEstaEnSesion();
    getProductoStockMin();



    $scope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
        getProductoStockMin();
      })

  }
})();