(function () {
    'use strict';
   
    /**
     * @ngdoc function
     * @name proyectoFrontApp.controller:forwardPass
     * @description
     * # forwardPass
     * Controller of the proyectoFrontApp
     */
    angular.module('proyectoFrontApp')
      .controller('forwardPass', forwardPass);
  
    forwardPass.$inject = ['serviceServicio', '$state'];

    function forwardPass(serviceServicio, $state) {
        var vm = this;

        function changePassword() {
            var parametros = {
                token: 'Bearer ' + $state.params.token,
                pass: vm.pass
              };
              serviceServicio.llamarMetodo('POST', '/cambiarContrasena', parametros)
                .then(successForward);
        }

        function successForward(result) {
            if (result.status) {
                vm.msg = 'Contraseña cambiada'
            }
        }

        vm.changePassword = changePassword;

    }
})()