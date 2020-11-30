(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name proyectoFrontApp.controller:ventasCtrl
   * @description
   * # ventasCtrl
   * Controller of the proyectoFrontApp
   */
  angular.module('proyectoFrontApp')
    .controller('ventasCtrl', ventasCtrl);

  ventasCtrl.$inject = [
    '$state',
    'serviceServicio'
  ];

  function ventasCtrl($state, serviceServicio) {
    // http://localhost:1337/usuario/crearAdmin
    var vm = this;
    vm.venta = {}
    vm.id = $state.params.id

    function _obtenerVenta() {
      serviceServicio.llamarMetodo('GET', '/venta')
        .then(_successObtenerVenta);
    }

    function _successObtenerVenta(result) {
      vm.ventas = result.data;
    }

    _obtenerVenta()
  
  }
})();