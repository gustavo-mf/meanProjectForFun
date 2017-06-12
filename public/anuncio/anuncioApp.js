// public/angularApp.js
 
// Criamos um módulo Angular chamado anuncio
const anuncio = angular.module('anuncio', []);
 
(function(app) {
	'use strict';
	app.controller('anuncioController', function($scope, $http) {
		let refresh = function() {
			$http.get('/api/anuncioAll').then(function(resp) {
				$scope.anuncios = resp.data;	
			}, function(resp) {
				console.log('Error: ' + resp);
			});
			$http.get('/api/tipo').then(function(resp) {
				$scope.findTipos = resp.data;
			}, function(resp) {
				console.log('Error: ' + resp);
			});
		};
		
		refresh();

		$scope.comprar = function(id) {			
			$http.put('/api/anuncio/'+id, {'situacao':'Em processo'}).then(function(resp) {	
				refresh();
			}, function(resp) {
				console.log('Error: ' + resp);
			});				
		};

		$scope.findAnuncio = function() {
			$http.get('/api/anuncio', {params:$scope.findAnun}).then(function(resp) {
				$scope.anuncios = resp.data;
			}, function(resp) {
				console.log('Error: ' + resp);
			});
		};

		$scope.mostarReputacao = function(id) {
			console.log(id);
			/*$http.get('/api/vendaUser/'+id).then(function(resp) {
				console.log(resp.data);
				//$scope.anuncios = resp.data;
				//<i class="material-icons">grade</i>
			}, function(resp) {
				console.log('Error: ' + resp);
			});*/
		};
	});	
})(anuncio);

