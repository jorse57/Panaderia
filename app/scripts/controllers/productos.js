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

    vm.busquedaProd = busquedaProd;
    vm.obtenerProductos = obtenerProductos;

    function obtenerProductos() {
      vm.filtroActivo = false;
      vm.codBusqueda = null;
      serviceServicio.llamarMetodo('GET', '/producto', { page: vm.page })
        .then(_successObtenerProductos);
    }

    function busquedaProd() {
      console.log("parametro busqueda", vm.codBusqueda);
      if (vm.codBusqueda) {
        serviceServicio.llamarMetodo('GET', '/producto/searchIdOrName/' + vm.codBusqueda)
          .then(_successBusquedaProd)
      }
    }

    function _successObtenerProductos(result) {
      vm.productos = result.data
    }

    function _successBusquedaProd(result) {
      vm.productos = []
      if (result.status) {
        vm.filtroActivo = true;
        vm.productos.push(result.data)
      }
    }

    obtenerProductos()
  }
})();
