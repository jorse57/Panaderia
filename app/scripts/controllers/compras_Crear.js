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
    vm.resBusProd = {};
    vm.addProd = {};
    vm.productos = [];
    vm.id = $state.params.id;
    vm.fechaCompra = new Date()
    vm.fechaEntregaP = new Date()

    vm.guardarCompra = guardarCompra;
    vm.busquedaProd = busquedaProd;
    vm.agreProTemp = agreProTemp;
    vm.ediProTemp = ediProTemp;
    vm.eliminarProd = eliminarProd;
    vm.canProTemp = canProTemp;

    function guardarCompra() {
      vm.productos
      for (let i = 0; i < vm.productos.length; i++) {
        const prod = vm.productos[i];
        let compra = {
          nitProveedor: vm.nitProveedor,
          nombreProveedor: vm.nombreProveedor,
          idProducto: prod.id,
          cantidad: prod.cantidad,
          costo: prod.costo,
          valor: prod.valor,
          numeroRecibo: vm.numeroRecibo,
          fechaCompra: vm.fechaCompra,
          fechaEntregaP: vm.fechaEntregaP,
        }
        _guardarCompra(compra)
      }
      $state.go('auth.Compras');
    }

    function busquedaProd() {
      if (vm.codBusqueda) {
        serviceServicio.llamarMetodo('GET', '/producto/searchIdOrName/' + vm.codBusqueda)
          .then(_successBusquedaProd)
      }
    }

    function agreProTemp() {
      vm.addProd.id = vm.resBusProd.data.id;
      vm.addProd.nombre = vm.resBusProd.data.nombre;
      if (vm.indexEdit) {
        vm.productos[vm.indexEdit - 1] = vm.addProd;
      } else {
        let index = _buscarProductoTemporal(vm.addProd.id)
        if (index > -1) {
          let prodExiste = vm.productos[index];
          prodExiste.cantidad += vm.addProd.cantidad;
        } else {
          vm.productos.push(vm.addProd)
        }
      }
      vm.addProd = {};
      vm.resBusProd = {};
    }
    
    function canProTemp() {
      vm.addProd = {};
      vm.resBusProd = {};
    }

    function ediProTemp(index, prod) {
      vm.codBusqueda = prod.id;
      busquedaProd();
      vm.editProd = prod;
      vm.indexEdit = index + 1;
    }

    function eliminarProd(index) {
      vm.productos.splice(index, 1)
    }

    function _guardarCompra(compra) {
      var params = {
        nitProveedor: compra.nitProveedor,
        nombreProveedor: compra.nombreProveedor,
        idProducto: compra.idProducto,
        cantidad: compra.cantidad,
        costo: compra.costo,
        valor: compra.valor,
        numeroRecibo: compra.numeroRecibo,
        fechaCompra: compra.fechaCompra.getTime(),
        fechaEntregaP: compra.fechaEntregaP.getTime()
      };

      serviceServicio.llamarMetodo('POST', '/compra', params)
        .then(_successGuardarCompra);
    }

    function _successGuardarCompra(result) {
      if (result.status) {
      } else {
        vm.error = true;
        vm.message = result.message;
      }
    }

    function _successBusquedaProd(result) {
      vm.resBusProd = result;
      if (result.status) {
        vm.addProd.valor = vm.resBusProd.data.precioVenta
        vm.codBusqueda = null;
      }

      if (vm.editProd) {
        vm.addProd.cantidad = vm.editProd.cantidad
        vm.addProd.costo = vm.editProd.costo
      }
      delete vm.editProd;
    }
    function _buscarProductoTemporal(idProd){
      return vm.productos.findIndex(function(x){
        return x.id === idProd;
      })
    }
  }
})();