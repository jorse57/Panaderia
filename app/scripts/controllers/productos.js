(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name proyectoFrontApp.controller:ProductosCtrl
   * @description
   * # ProductosCtrl
   * Controller of the proyectoFrontApp
   */
  angular.module('proyectoFrontApp')
    .controller('ProductosCtrl', ProductosCtrl);

  ProductosCtrl.$inject = [
    '$state',
    'serviceServicio'
  ];

  function ProductosCtrl($state, serviceServicio) {
    // http://localhost:1337/usuario/crearAdmin
    var vm = this;
    vm.productos = []
    vm.page = $state.params.page

    _obtenerProductos(vm.id)

    function _obtenerProductos(id) {
      serviceServicio.llamarMetodo('GET', '/producto', { page: vm.page })
        .then(_successObtenerProductos);
    }

    function _successObtenerProductos(result) {
      vm.productos = result.data
    }
  }
})();
