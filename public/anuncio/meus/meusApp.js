// public/angularApp.js
 
// Criamos um módulo Angular chamado meus que chama os anuncios do usuario
const meus = angular.module('meus', []);
 
(function(app) {
	'use strict';
	app.controller('meusController', function($scope, $http) {

		$http.get('/api/tipo').then(function(resp) {
			$scope.findTipos = resp.data;
		}, function(resp) {
			console.log('Error: ' + resp);
		});

		$http.get('/api/usuario').then(function(resp) {
			$scope.usuarios = resp.data;
		}, function(resp) {
			console.log('Error: ' + resp);
		});

		$scope.refresh = function(id) {
			//como não tem login vou informar um id
			if (typeof id == 'undefined') return;
			$http.get('/api/anuncioMeus/'+id).then(function(resp) {
				$scope.anuncios = resp.data;	
			}, function(resp) {
				console.log('Error: ' + resp);
			});
		};

		$scope.criarAnuncio = function() {
			$http.post('/api/anuncio', $scope.novoAnun).then(function(resp) {
				if (resp.status == 200) {
					$('#criar').modal('close');
					$scope.refresh();
				}
			}, function(resp) {
				console.log('Error: ' + resp);
			});
		};
		$scope.deletarAnuncio = function(id) {
			$http.delete('/api/anuncio/'+id).then(function(resp) {
				$scope.refresh($scope.buscar._id);
			}, function(resp) {
				console.log('Error: ' + resp);
			});
		};
		$scope.loadEdit = function(anuncio) {
			$scope.edit = anuncio;
		};
		$scope.editarAnuncio = function(anuncio) {
			$http.put('/api/anuncio/'+anuncio._id, anuncio).then(function(resp) {
				$scope.refresh($scope.buscar._id);
				$('#editar').modal('close');
			}, function(resp) {
				console.log('Error: ' + resp);
			});
		};
	});
})(meus);
