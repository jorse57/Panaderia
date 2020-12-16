(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name proyectoFrontApp.controller:ProductoCrAcCtrl
   * @description
   * # ProductoCrAcCtrl
   * Controller of the proyectoFrontApp
   */
  angular.module('proyectoFrontApp')
    .controller('ProductoCrAcCtrl', ProductoCrAcCtrl);

  ProductoCrAcCtrl.$inject = [
    '$state',
    'serviceServicio'
  ];

  function ProductoCrAcCtrl($state, serviceServicio) {
    var vm = this;
    vm.producto = {}
    vm.id = $state.params.id

    vm.guardar = guardar;
    vm.tituloVista = 'Crear'

    if (vm.id) {
      vm.tituloVista = 'Actualizar'
      _obtenerProducto(vm.id);
    }

    function guardar() {
      if (vm.producto.id) {
        _actualizarActualizar();
      } else {
        _guardarProducto();
      }
    }

    function _obtenerProducto(id) {
      serviceServicio.llamarMetodo('GET', '/producto/' + id)
        .then(_successObtenerProducto);
    }

    function _successObtenerProducto(result) {
      vm.producto = result.data;
      vm.producto.fechaCaducidad = new Date(vm.producto.fechaCaducidad)
    }

    function _guardarProducto() {
      var params = {
        nombre: vm.producto.nombre,
        existencias: vm.producto.existencias,
        precioVenta: vm.producto.precioVenta,
        tipoProducto: vm.producto.tipoProducto,
        estado: vm.producto.estado,
        descripcion: vm.producto.descripcion,
        unidadMedida: vm.producto.unidadMedida,
        stockMin: vm.producto.stockMin,
        stockMax: vm.producto.stockMax,
        fechaCaducidad: vm.producto.fechaCaducidad,
      };

      serviceServicio.llamarMetodo('POST', '/producto', params)
        .then(_successGuardarProducto);
    }

    function _successGuardarProducto(result) {
      $state.go('auth.productos')
    }

    function _actualizarActualizar() {
      var params = {
        id: vm.producto.id,
        nombre: vm.producto.nombre,
        existencias: vm.producto.existencias,
        precioVenta: vm.producto.precioVenta,
        tipoProducto: vm.producto.tipoProducto,
        estado: vm.producto.estado,
        descripcion: vm.producto.descripcion,
        unidadMedida: vm.producto.unidadMedida,
        stockMin: vm.producto.stockMin,
        stockMax: vm.producto.stockMax,
        fechaCaducidad: vm.producto.fechaCaducidad,
      };

      serviceServicio.llamarMetodo('PUT', '/producto', params)
        .then(_successGuardarProducto);
    }

  }
})();
