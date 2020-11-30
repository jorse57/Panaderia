(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name proyectoFrontApp.controller:compraCrCtrl
   * @description
   * # compraCrCtrl
   * Controller of the proyectoFrontApp
   */
  angular.module('proyectoFrontApp')
    .controller('compraCrCtrl', compraCrCtrl);

  compraCrCtrl.$inject = [
    '$state',
    'serviceServicio'
  ];

  function compraCrCtrl($state, serviceServicio) {
    var vm = this;
    vm.compra = {}
    vm.id = $state.params.id

    vm.guardarCompra = guardarCompra;

    function guardarCompra() {
      var params = {
        nitProveedor: vm.compra.nitProveedor,
        nombreProveedor: vm.compra.nombreProveedor,
        idProducto: vm.compra.idProducto,
        cantidad: vm.compra.cantidad,
        costo: vm.compra.costo,
        valor: vm.compra.valor,
        numeroRecibo: vm.compra.numeroRecibo,
        fechaCompra: vm.compra.fechaCompra.getTime(),
        fechaEntregaP: vm.compra.fechaEntregaP.getTime()
      };

      serviceServicio.llamarMetodo('POST', '/compra', params)
        .then(_successGuardarCompra);
    }

    function _successGuardarCompra(result) {
      if (result.status) {
        $state.go('auth.Compras');
      } else {
        vm.error = true;
        vm.message = result.message;
      }
    }
  }
})();