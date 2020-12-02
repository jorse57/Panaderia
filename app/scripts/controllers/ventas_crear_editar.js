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
    vm.canProTemp = canProTemp;

    function guardarVenta() {
      let exisAgreg = vm.productos.map(function(x){
        return { id: x.id, cantidad: x.cantidad}
      })

      serviceServicio.llamarMetodo('POST', '/producto/validarExistencias', { productos: exisAgreg })
      .then(function (resCantidadPro) {
        if (resCantidadPro.data && resCantidadPro.data.invalidos && resCantidadPro.data.invalidos.length) { 
          vm.error = true;
          vm.message = ''
          for (let i = 0; i < resCantidadPro.data.invalidos.length; i++) {
            const inv = resCantidadPro.data.invalidos[i];
            vm.message += 'El porducto <strong>' + inv.nombre + ' </strong> solo tiene disponibles <strong>' + inv.existenciasDisponibles + '</strong> <br> '
          }
        } else {
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
        idUsuario: vm.user.id,
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

    function eliminarProd(index){
      vm.productos.splice(index, 1)
    }

    function ediProTemp(index, prod) {
      vm.codBusqueda = prod.id;
      busquedaProd();
      vm.editProd = prod;
      vm.indexEdit = index + 1;
    }

    function quienEstaEnSesion() {
      serviceServicio.llamarMetodo('GET', '/usuario/login')
        .then(_successLogin);
    }

    function canProTemp() {
      vm.addProd = {};
      vm.resBusProd = {};
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
        if (vm.editProd) {
          vm.addProd.cantidad = vm.editProd.cantidad
          vm.addProd.costo = vm.editProd.costo
        } else {
          let index = _buscarProductoTemporal(vm.resBusProd.data.id)
          if (index > -1){
            let prodTemp = vm.productos[index];
            vm.resBusProd.data.existencias -= prodTemp.cantidad 
          }
        }
      }
      delete vm.editProd;
    }
    function _successLogin(result) {
      vm.user = result.data;
    }
    function _buscarProductoTemporal(idProd){
      return vm.productos.findIndex(function(x){
        return x.id === idProd;
      })
    }

    quienEstaEnSesion();
  }
})();