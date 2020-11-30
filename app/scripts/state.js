(function(){
  'use strict';

  angular.module('proyectoFrontApp')
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      stateFunction
    ]);

  function stateFunction($stateProvider, $urlRouterProvider) {
    $urlRouterProvider

      .when('/home', '/')
      .otherwise('/');

    $stateProvider
      .state('notFound', {
        url: '/404',
        templateUrl: '404.html',
      })

      .state('passwordReset', {
        url: '/password-reset/:token',
        templateUrl: 'components/authentication/signin.html',
        controller: 'ResetpasswordCtrl',
        params: {
          id: 4
        }
      })

      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'loginCtrl as loginVm',
      })

      .state('forwardPassword', {
        url: '/forwardPassword/:token',
        templateUrl: 'views/forwardPass.html',
        controller: 'forwardPass as forwardPassVM',
      })

      .state('auth', {
        abstract: true,
        url: '',
        templateUrl: 'views/auth.html',
        controller: 'HomeCtrl as HomeVm'
      })

      .state('auth.home', {
        url: '/',
        templateUrl: 'views/home.html',
      })

      .state('auth.usuarios', {
        url: '/usuarios:page',
        templateUrl: 'views/usuarios.html',
        controller: 'usuariosCtrl as usuariosVm'
      })

      .state('auth.CrearActualizarUsuarios', {
        url: '/usuario-crear-actualizar/:id',
        templateUrl: 'views/usuarios_crear_actualizar.html',
        controller: 'usuarioCrAcCtrl as usuarioCrAcVm'
      })
      .state('auth.CambiarpassUsuario', {
        url: '/usuario-cambiar-pass/:id',
        templateUrl: 'views/usuarios_cambiar_contrasena.html',
        controller: 'cambiarPassCtrl as usuarioPassVm'
      })

      .state('auth.productos', {
        url: '/productos:page',
        templateUrl: 'views/productos.html',
        controller: 'ProductosCtrl as productosVm'
      })

      .state('auth.CrearActualizarProducto', {
        url: '/producto-crear-actualizar/:id',
        templateUrl: 'views/producto_crear_actualizar.html',
        controller: 'ProductoCrAcCtrl as productoCrAcVm'
      })
      .state('auth.Compras', {
        url: '/compras',
        templateUrl: 'views/compras.html',
        controller: 'comprasCtrl as compraVm'
      })
      .state('auth.comprasCrear', {
        url: '/compras/crear',
        templateUrl: 'views/compra_crear.html',
        controller: 'compraCrCtrl as compraCrVm'
      })

      .state('auth.Ventas', {
        url: '/ventas',
        templateUrl: 'views/ventas.html',
        controller: 'ventasCtrl as ventaVm'
      })
      .state('auth.ventasCrear', {
        url: '/ventas/crear',
        templateUrl: 'views/venta_crear_editar.html',
        controller: 'ventaCrCtrl as ventaCrVm'
      })

      

      ;
    }
  
  })();