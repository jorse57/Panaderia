(function () {
    'use strict';
    /**
     * @ngdoc function
     * @name proyectoFrontApp.controller:comprasCtrl
     * @description
     * # comprasCtrl
     * Controller of the proyectoFrontApp
     */
    angular.module('proyectoFrontApp')
      .controller('comprasCtrl', comprasCtrl);
  
    comprasCtrl.$inject = [
      '$state',
      'serviceServicio'
    ];
  
    function comprasCtrl($state, serviceServicio) {
      // http://localhost:1337/usuario/crearAdmin
      var vm = this;
      vm.compra = {}
      vm.id = $state.params.id

      function _obtenerCompra() {
        serviceServicio.llamarMetodo('GET', '/compra')
          .then(_successObtenerCompra);
      }
  
      function _successObtenerCompra(result) {
        vm.compras = result.data;
      }
  
      _obtenerCompra()
    
    }
  })();
  