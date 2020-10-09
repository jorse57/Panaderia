(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name proyectoFrontApp.controller:usuarioCrAcCtrl
   * @description
   * # usuarioCrAcCtrl
   * Controller of the proyectoFrontApp
   */
  angular.module('proyectoFrontApp')
    .controller('usuarioCrAcCtrl', usuarioCrAcCtrl);

  usuarioCrAcCtrl.$inject = [
    '$state',
    'serviceServicio'
  ];

  function usuarioCrAcCtrl($state, serviceServicio) {
    // http://localhost:1337/usuario/crearAdmin
    var vm = this;
    vm.usuario = {}
    vm.id = $state.params.id

    vm.guardar = guardar;

    if (vm.id) {
      _obtenerUsario(vm.id);
    }

    function guardar() {
      if (vm.usuario.id) {
        _actualizarUsuario();
      } else {
        _guardarUsuario();
      }
    }

    function _obtenerUsario(id) {
      serviceServicio.llamarMetodo('GET', '/usuario/' + id)
        .then(_successObtenerUsuario);
    }

    function _successObtenerUsuario(result) {
      vm.usuario = result.data;
    }

    function _guardarUsuario() {
      var params = {
        id: vm.usuario.id,
        nombre: vm.usuario.nombre,
        identificacion: vm.usuario.identificacion,
        contrasena: vm.usuario.contrasena,
        correo: vm.usuario.correo,
        telefono: vm.usuario.telefono,
        direccion: vm.usuario.direccion,
        estado: vm.usuario.estado,
        rol: vm.usuario.rol
      };

      serviceServicio.llamarMetodo('POST', '/usuario', params)
        .then(_successGuardarUsuario);
    }

    function _successGuardarUsuario(result) {
      $state.go('auth.usuarios')
    }

    function _actualizarUsuario() {
      var params = {
        id: vm.usuario.id,
        nombre: vm.usuario.nombre,
        identificacion: vm.usuario.identificacion,
        contrasena: vm.usuario.contrasena,
        correo: vm.usuario.correo,
        telefono: vm.usuario.telefono,
        direccion: vm.usuario.direccion,
        estado: vm.usuario.estado,
        rol: vm.usuario.rol
      };

      serviceServicio.llamarMetodo('PUT', '/usuario', params)
        .then(_successGuardarUsuario);
    }

  }
})();
