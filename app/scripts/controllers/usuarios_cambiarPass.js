(function () {
    'use strict';
    /**
     * @ngdoc function
     * @name proyectoFrontApp.controller:cambiarPassCtrl
     * @description
     * # cambiarPassCtrl
     * Controller of the proyectoFrontApp
     */
    angular.module('proyectoFrontApp')
        .controller('cambiarPassCtrl', cambiarPassCtrl);

    cambiarPassCtrl.$inject = [
        '$state',
        'serviceServicio'
    ];

    function cambiarPassCtrl($state, serviceServicio) {
        var vm = this;
        function guardarNewPass(){
            var params = {
                id:$state.params.id,
                pass:vm.pass
            }
            serviceServicio.llamarMetodo('POST','/cambiarPass', params)
                .then(successGuardarNewPass)
                $state.go('auth.usuarios');
        }


        function successGuardarNewPass(result){
            console.log(result);
        }

        vm.guardarNewPass= guardarNewPass;
        
    }
})();