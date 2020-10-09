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

    _obtenerUsario(vm.id)

    function _obtenerUsario(id) {
      serviceServicio.llamarMetodo('GET', '/usuario', { page: vm.page })
        .then(_successObtenerUsuario);
    }

    function _successObtenerUsuario(result) {
      vm.usuarios = result.data
    }
  }
})();
