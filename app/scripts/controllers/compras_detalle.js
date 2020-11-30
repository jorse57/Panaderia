(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name proyectoFrontApp.controller:compraDetaCtrl
   * @description
   * # compraDetaCtrl
   * Controller of the proyectoFrontApp
   */
  angular.module('proyectoFrontApp')
    .controller('compraDetaCtrl', compraDetaCtrl);

  compraDetaCtrl.$inject = [
    '$state',
    'serviceServicio'
  ];

  function compraDetaCtrl($state, serviceServicio) {
    var vm = this;
    vm.compra = {}
    vm.recibo = $state.params.recibo

    if (vm.recibo) {
      _obtenerCompra(vm.recibo);
    }

    function _obtenerCompra(id) {
      serviceServicio.llamarMetodo('GET', '/compra/recibo/' + id)
        .then(_successObtenerCompra);
    }

    function _successObtenerCompra(result) {
      vm.infoCompra = result.data[0]
      vm.compra = result.data;
      console.log(result)
    }

  }
})();