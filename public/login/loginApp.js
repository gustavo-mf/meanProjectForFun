const usuario = angular.module('usuario', []);
 
(function(app) {
	'use strict';
	app.controller('usuarioController', function($scope, $http, $window) {
		$scope.login = function() {			
			if ($scope.loginForm.email.$valid && $scope.loginForm.senha.$valid) {
				$http.post('/api/usuario/auth', $scope.user).then(function(resp) {	
					if (resp) {
						$window.location.href = '/index.html';
					}
				}, function(resp) {
					console.log('Error: ' + resp);
				});	
			}
			
		};
	});	
})(usuario);
