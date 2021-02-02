(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name proyectoFrontApp.controller:usuariosCtrl
   * @description
   * # usuariosCtrl
   * Controller of the proyectoFrontApp
   */
  angular.module('proyectoFrontApp')
    .controller('usuariosCtrl', usuariosCtrl);

  usuariosCtrl.$inject = [
    '$state',
    'serviceServicio'
  ];

  function usuariosCtrl($state, serviceServicio) {
    // http://localhost:1337/usuario/crearAdmin
    var vm = this;
    vm.usuarios = []
    vm.page = $state.params.page

    vm.id = $state.params.id

    function _obtenerUsario(id) {
      vm.filtroActivo = false;
      vm.numeroRecibo = null;
      serviceServicio.llamarMetodo('GET', '/usuario', { page: vm.page })
        .then(_successObtenerUsuario);
    }

    function busquedaUsuario() {
      console.log(vm.numeroRecibo);
      if (vm.numeroRecibo) {
        serviceServicio.llamarMetodo('GET', '/usuario/search/' + vm.numeroRecibo)
          .then(_successBusquedaUsuario)
      }
    }

    function _successObtenerUsuario(result) {
      vm.usuarios = result.data
    }


    function _successBusquedaUsuario(result) {
      vm.usuarios = []
      if (result.status) {
        vm.filtroActivo = true;
        vm.usuarios.push(result.data)
      }
    }
    _obtenerUsario()

    vm.obtenerUsario = _obtenerUsario;
    vm.busquedaUsuario = busquedaUsuario;
  }
})();
