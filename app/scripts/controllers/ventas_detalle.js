(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name proyectoFrontApp.controller:ventaDetCtrl
   * @description
   * # ventaDetCtrl
   * Controller of the proyectoFrontApp
   */
  angular.module('proyectoFrontApp')
    .controller('ventaDetCtrl', ventaDetCtrl);

  ventaDetCtrl.$inject = [
    '$state',
    'serviceServicio'
  ];

  function ventaDetCtrl($state, serviceServicio) {
    var vm = this;
    vm.venta= {}
    vm.recibo = $state.params.numeroRecibo

    if (vm.recibo) {
      _obtenerVenta(vm.recibo);
    }

    function _obtenerVenta(id) {
      serviceServicio.llamarMetodo('GET', '/venta/recibo/' + id)
        .then(_successObtenerVenta);
    }

    function _successObtenerVenta(result) {
      vm.infoVenta = result.data[0]
      vm.venta = result.data;
      console.log(result)
    }

  }
})();