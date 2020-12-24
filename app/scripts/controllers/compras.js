(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name proyectoFrontApp.controller:comprasCtrl
   * @description
   * # comprasCtrl
   * Controller of the proyectoFrontApp
   */
  angular.module('proyectoFrontApp')
    .controller('comprasCtrl', comprasCtrl);

  comprasCtrl.$inject = [
    '$state',
    'serviceServicio'
  ];

  function comprasCtrl($state, serviceServicio) {
    // http://localhost:1337/usuario/crearAdmin
    var vm = this;
    vm.compra = {}
    vm.id = $state.params.id

    vm.obtenerCompra = _obtenerCompra;
    vm.busquedaCompra = busquedaCompra;

    function _obtenerCompra() {
      vm.filtroActivo = false;
      vm.numeroRecibo = null;
      serviceServicio.llamarMetodo('GET', '/compra')
        .then(_successObtenerCompra);
    }

    function busquedaCompra() {
      if (vm.numeroRecibo) {
        serviceServicio.llamarMetodo('GET', '/compra/search/' + vm.numeroRecibo)
          .then(_successBusquedaCompra)
      }
    }

    function _successObtenerCompra(result) {
      vm.compras = result.data;
    }

    function _successBusquedaCompra(result) {
      vm.compras = []
      if (result.status) {
        vm.filtroActivo = true;
        vm.compras.push(result.data)
      }
    }

    _obtenerCompra()

  }
})();
