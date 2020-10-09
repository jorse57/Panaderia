(function () {
  "use strict";

  /**
   * @ngdoc service
   * @name proyectoFrontApp.serviceServicio
   * @description
   * # serviceServicio
   * Service in the proyectoFrontApp.
   */
  angular
    .module('proyectoFrontApp')
    .service('serviceServicio', serviceServicio);

  serviceServicio.$inject = [
    '$q',
    '$http',
    '$rootScope'
  ];

  function serviceServicio($q, $http, $rootScope) {

    this.llamarMetodo = llamarMetodo;

    function llamarMetodo(metodo, url, parametros) {
      var deferred = $q.defer();
      var req = {
        method: metodo,
        url: $rootScope.urlBack + url,
        headers: {
          'Content-Type': 'application/json'
        },
        data: parametros || {},
        json: true
      }

      var token = localStorage.getItem('token_proyecto');
      if (token) req.headers['Authorization'] = 'Bearer ' + token;
      
      $http(req).then(function (res) {
        if (res.status === 200) {
          deferred.resolve(res.data);
        } else {
          console.error("ERROR ON MS")
          deferred.reject("ERROR ON MS");
        }
      }, function (err) {
        deferred.reject(err);
      });

      return deferred.promise;
    }
  }
})()