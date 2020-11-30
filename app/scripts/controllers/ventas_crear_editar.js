(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name proyectoFrontApp.controller:ventaCrCtrl
   * @description
   * # ventaCrCtrl
   * Controller of the proyectoFrontApp
   */
  angular.module('proyectoFrontApp')
    .controller('ventaCrCtrl', ventaCrCtrl);

  ventaCrCtrl.$inject = [
    '$state',
    'serviceServicio'
  ];

  function ventaCrCtrl($state, serviceServicio) {
    var vm = this;
    vm.venta = {}
    vm.id = $state.params.id

    vm.guardarVenta = guardarVenta;

    function guardarVenta() {
      var params = {
        fechaVenta: vm.venta.fechaVenta.getTime(),
        idProducto: vm.venta.idProducto,
        cantidad: vm.venta.cantidad,
        precio: vm.venta.precio,
        idCliente: vm.venta.idCliente,
        idUsuario: vm.venta.idUsuario,
      };

      serviceServicio.llamarMetodo('POST', '/venta', params)
        .then(_successGuardarVenta);
    }

    function _successGuardarVenta(result) {
      if (result.status) {
        $state.go('auth.Ventas');
      } else {
        vm.error = true;
        vm.message = result.message;
      }
    }
  }
})();