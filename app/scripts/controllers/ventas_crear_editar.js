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
    vm.venta = {};
    vm.fechaVenta = new Date();

    vm.id = $state.params.id
    vm.addProd = {};
    vm.productos = [];

    vm.guardarVenta = guardarVenta;
    vm.busquedaProd = busquedaProd;
    vm.agreProTemp = agreProTemp;
    vm.ediProTemp = ediProTemp;
    vm.eliminarProd = eliminarProd;

    function guardarVenta() {
      serviceServicio.llamarMetodo('GET', '/venta/numeroRecibo')
        .then(function (res) {
          if (res.status) {
            for (let i = 0; i < vm.productos.length; i++) {
              const prod = vm.productos[i];
              let venta = {
                idProducto: prod.id,
                cantidad: prod.cantidad,
                precio: prod.precio,
                numeroRecibo: res.data,
                fechaVenta: vm.fechaVenta
              }
              _guardarVenta(venta)
            }
            $state.go('auth.Ventas');
          } else {
            vm.error = true;
            vm.message = res.message;
          }
        })
    }
    function _guardarVenta(venta) {
      var params = {
        idProducto: venta.idProducto,
        numeroRecibo: venta.numeroRecibo,
        cantidad: venta.cantidad,
        precio: venta.precio,
        fechaVenta: vm.fechaVenta.getTime(),
        idCliente: vm.idUsuario,
        //Acá hay que agregar el id del usuario en sesión quemo el 1 porque es el admin Abajo
        idUsuario: 1,
      };

      serviceServicio.llamarMetodo('POST', '/venta', params)
        .then(_successGuardarVenta);
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
        vm.productos.push(vm.addProd)
      }
      vm.addProd = {};
      vm.resBusProd = {};
    }
    function eliminarProd(index){
      vm.productos.splice(index, 1)
    }


    function ediProTemp(index, prod) {
      vm.codBusqueda = prod.id;
      busquedaProd();
      vm.editProd = prod;
      vm.indexEdit = index + 1;
    }

    function _successGuardarVenta(result) {
      if (result.status) {
        $state.go('auth.Ventas');
      } else {
        vm.error = true;
        vm.message = result.message;
      }
    }
    function _successBusquedaProd(result) {
      vm.resBusProd = result;
      if (result.status) {
        vm.addProd.precio = vm.resBusProd.data.precioVenta
        vm.codBusqueda = null;
      }

      if (vm.editProd) {
        vm.addProd.cantidad = vm.editProd.cantidad
        vm.addProd.costo = vm.editProd.costo
      }
      delete vm.editProd;
    }

  }
})();