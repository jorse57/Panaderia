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
    'serviceServicio',
  ];

  function ventasCtrl($state, serviceServicio) {
    // http://localhost:1337/usuario/crearAdmin
    var vm = this;
    vm.venta = {}
    vm.id = $state.params.id
    vm.page = $state.params.page

    
    vm.obtenerVenta = _obtenerVenta;
    vm.busquedaVenta = busquedaVenta;


    function _obtenerVenta() {
      vm.filtroActivo = false;
      vm.numeroRecibo = null;
      serviceServicio.llamarMetodo('GET', '/venta')
        .then(_successObtenerVenta);
    }

    
    function busquedaVenta() {
      if (vm.numeroRecibo) {
        serviceServicio.llamarMetodo('GET', '/venta/search/' + vm.numeroRecibo)
          .then(_successBusquedaVenta)
      }
    }

    function _successObtenerVenta(result) {
      vm.ventas = result.data;
    }

    function _successBusquedaVenta(result) {
      vm.ventas = []
      if (result.status) {
        vm.filtroActivo = true;
        vm.ventas.push(result.data)
      }
    }


    _obtenerVenta()
  }
})();